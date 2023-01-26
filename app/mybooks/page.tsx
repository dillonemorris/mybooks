'use client'

import useSWR from 'swr'
import Link from 'next/link'
import {
  BookOpenIcon,
  MagnifyingGlassPlusIcon,
} from '@heroicons/react/20/solid'
import { Book } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { BASE_API_ROUTE } from '../../config'
import { BookList } from '../../components/BookList'
import { BookListItem } from '../../components/BookListItem'
import { EmptyBookList } from '../../components/EmptyBookList'

const MyBooksPage = () => {
  const books = useMyBooks()
  const { status } = useSession()

  if (status === 'loading') {
    return <EmptyBookList />
  }

  if (status !== 'authenticated') {
    return <UnAuthenticated />
  }

  if (!books.length) {
    return <NoBooks />
  }

  return <MyBooks />
}

const MyBooks = () => {
  const books = useMyBooks()

  return (
    <BookList>
      <TabBar />
      {books.map((book) => {
        return (
          <BookListItem
            key={book.id}
            book={{
              href: `mybooks/${book.googleBooksId}`,
              title: book.title,
              authors: book.authors,
              image: book.image,
              googleBooksId: book.googleBooksId,
            }}
          />
        )
      })}
    </BookList>
  )
}

const useMyBooks = () => {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q')
  const readParam = searchParams.get('read')
  const baseKey = `${BASE_API_ROUTE}/api/mybooks`
  const searchKey = !!searchQuery ? `${baseKey}?q=${searchQuery}` : baseKey
  const key = !!readParam ? `${searchKey}?read=${readParam}` : searchKey

  const { data } = useSWR<{ books: Book[] }>(key)

  return data.books
}

const UnAuthenticated = () => {
  return (
    <div className="px-4 py-32 text-center">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        It looks like you're not logged in.
      </h3>
      <div className="mt-2 text-sm text-gray-500">
        <p>Go to our Github signin page to log in</p>
      </div>
      <div className="mt-5">
        <Link
          href="api/auth/signin"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
        >
          Log in
        </Link>
      </div>
    </div>
  )
}

const NoBooks = () => {
  return (
    <div className="text-center py-32">
      <BookOpenIcon
        className="mx-auto h-12 w-12 text-gray-400"
        aria-hidden="true"
      />

      <h3 className="mt-2 text-sm font-medium text-gray-900">No books</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by discovering a book.
      </p>
      <div className="mt-6">
        <Link
          href="/discover"
          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <MagnifyingGlassPlusIcon
            className="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          Discover
        </Link>
      </div>
    </div>
  )
}

const TabBar = () => {
  const tabs = useTabs()

  return (
    <nav
      className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
      aria-label="Tabs"
    >
      {tabs.map((tab, tabIdx) => (
        <Link
          key={tab.name}
          href={{
            pathname: '/mybooks',
            query: tab.readParam ? { read: tab.readParam } : null,
          }}
          className={classNames(
            tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
            tabIdx === 0 ? 'rounded-l-lg' : '',
            tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
          )}
          aria-current={tab.current ? 'page' : undefined}
        >
          <span>{tab.name}</span>
          <span
            aria-hidden="true"
            className={classNames(
              tab.current ? 'bg-indigo-500' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5'
            )}
          />
        </Link>
      ))}
    </nav>
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const useTabs = () => {
  const searchParams = useSearchParams()
  const readParam = searchParams.get('read')

  return [
    { name: 'All', current: !readParam },
    {
      name: 'Want to read',
      readParam: 'false',
      current: readParam === 'false',
    },
    {
      name: 'Read',
      readParam: 'true',
      current: readParam === 'true',
    },
  ]
}

export default MyBooksPage

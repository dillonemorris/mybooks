'use client'

import useSWR from 'swr'
import Link from 'next/link'
import {
  BookOpenIcon,
  MagnifyingGlassPlusIcon,
} from '@heroicons/react/20/solid'
import { Book } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { BASE_API_ROUTE } from '../../config'
import { BookList } from '../../components/BookList'
import { BookListItem } from '../../components/BookListItem'
import { EmptyBookList } from '../../components/EmptyBookList'

const MyBooks = ({ searchParams }) => {
  const { status } = useSession()
  const myBooksKey = searchParams?.q
    ? `${BASE_API_ROUTE}/api/mybooks?q=${searchParams.q}`
    : `${BASE_API_ROUTE}/api/mybooks`

  const { data } = useSWR<{ books: Book[] }>(myBooksKey)
  const { books } = data

  if (status === 'loading') {
    return <EmptyBookList />
  }

  if (status !== 'authenticated') {
    return <UnAuthenticated />
  }

  if (!books.length) {
    return <NoBooks />
  }

  return (
    <BookList>
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

export default MyBooks

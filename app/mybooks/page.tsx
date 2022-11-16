'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import Loading from './loading'
import { useSession } from 'next-auth/react'
import {
  BookOpenIcon,
  MagnifyingGlassPlusIcon,
} from '@heroicons/react/20/solid'
import { BookListItem } from './BookListItem'

const MyBooks = () => {
  const { status } = useSession()

  // TODO: Move fetcher to global config wrapper
  const { data } = useSWR(
    '/api/mybooks',
    (resource, init) => fetch(resource, init).then((res) => res.json()),
    { suspense: true }
  )

  const { books } = data

  if (status === 'unauthenticated') {
    return <UnAuthenticated />
  }

  if (!books.length) {
    return <NoBooks />
  }

  return (
    <Suspense fallback={<Loading />}>
      <ul className="flex flex-col divide-y divide-gray-200">
        {books.map((book) => {
          return (
            <BookListItem
              key={book.id}
              href={`mybooks/${book.id}`}
              title={book.title}
              description={book.description}
            />
          )
        })}
      </ul>
    </Suspense>
  )
}

const UnAuthenticated = () => {
  return (
    <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        It looks like you're not logged in.
      </h3>
      <div className="mt-2 max-w-xl text-sm text-gray-500">
        <p>Go to our Github log in page to log in</p>
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
    <div className="text-center">
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

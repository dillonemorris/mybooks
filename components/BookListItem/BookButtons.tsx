'use client'

import useSWR from 'swr'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { classNames } from '../../utils/classNames'
import { BASE_API_ROUTE } from '../../config'
import { Book } from '@prisma/client'

const ButtonType = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
}

export const BookButtons = ({
  book,
}: {
  book: { title: Book['title']; authors: Book['authors']; image: Book['image'] }
}) => {
  const hasBeenRead = false
  const wantToRead = false

  const createBook = useCreateBook(book)

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={createBook}
        className={classNames(
          'inline-flex items-center rounded border border-transparent px-2.5 py-1.5 text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          wantToRead ? ButtonType.primary : ButtonType.secondary
        )}
      >
        {wantToRead ? (
          <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        ) : null}
        Want to read
      </button>
      <button
        type="button"
        className={classNames(
          'inline-flex items-center rounded border border-transparent px-2.5 py-1.5 text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          hasBeenRead ? ButtonType.primary : ButtonType.secondary
        )}
      >
        {hasBeenRead ? (
          <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        ) : null}
        Read
      </button>
    </div>
  )
}

const useCreateBook = (book) => {
  const { mutate } = useSWR(`${BASE_API_ROUTE}/api/book`)

  return async () => {
    await mutate(book)
  }
}

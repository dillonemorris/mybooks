'use client'

import useSWR, { useSWRConfig } from 'swr'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { classNames } from '../../utils/classNames'
import { BASE_API_ROUTE } from '../../config'
import { Book } from '@prisma/client'

type BookButtonsProps = {
  book: {
    title: Book['title']
    authors: Book['authors']
    image: Book['image']
    googleBooksId: Book['googleBooksId']
  }
}

const ButtonType = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
}

export const BookButtons = ({ book }: BookButtonsProps) => {
  const createBook = useCreateBook(book)
  const createAndUpdateBook = useCreateAndUpdateBook(book)
  const myBook = useMyBook(book.googleBooksId)

  const wantToRead = !!myBook && !myBook.finishedAt
  const hasBeenRead = myBook?.finishedAt

  const updateBook = useUpdateBook(myBook?.id)

  // TODO:
  // 1. Make updating from "Read" to "Want to read" work
  // 2. Loading icon

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
        <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Want to read
      </button>
      <button
        type="button"
        onClick={!!myBook ? updateBook : createAndUpdateBook}
        className={classNames(
          'inline-flex items-center rounded border border-transparent px-2.5 py-1.5 text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          hasBeenRead ? ButtonType.primary : ButtonType.secondary
        )}
      >
        <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Read
      </button>
    </div>
  )
}

const useMyBook = (bookId) => {
  const books = useMyBooks()

  return books?.find((myBook) => myBook.googleBooksId === bookId)
}

const useMyBooks = () => {
  return useSWR<{ books: Book[] }>(`${BASE_API_ROUTE}/api/mybooks`).data.books
}

const useCreateAndUpdateBook = (book) => {
  const createBook = useCreateBook({
    ...book,
    finishedAt: new Date(),
  })

  return async (e) => {
    await createBook(e)
  }
}

const useCreateBook = (book) => {
  const { mutate } = useSWRConfig()

  return async (e) => {
    e.preventDefault()

    try {
      await mutate(`${BASE_API_ROUTE}/api/book`, createBook(book))
    } catch (error) {
      console.error(error)
    }

    await mutate(`${BASE_API_ROUTE}/api/mybooks`)
  }
}

const createBook = async (book) => {
  await fetch(`${BASE_API_ROUTE}/api/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  })
}

const useUpdateBook = (bookId) => {
  const { mutate } = useSWRConfig()

  if (!bookId) {
    return null
  }

  return async (e) => {
    e.preventDefault()

    try {
      await mutate(`${BASE_API_ROUTE}/api/finish/${bookId}`, updateBook(bookId))
    } catch (error) {
      console.error(error)
    }

    await mutate(`${BASE_API_ROUTE}/api/mybooks`)
  }
}

const updateBook = async (id) => {
  await fetch(`${BASE_API_ROUTE}/api/finish/${id}`, {
    method: 'PUT',
  })
}

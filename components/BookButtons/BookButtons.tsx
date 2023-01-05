'use client'

import { Book } from '@prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { BASE_API_ROUTE } from '../../config'
import './style.css'

type BookButtonsProps = {
  book: {
    title: Book['title']
    authors: Book['authors']
    image: Book['image']
    googleBooksId: Book['googleBooksId']
  }
}

const BookButtons = ({ book }: BookButtonsProps) => {
  const createBook = useCreateBook(book)
  const createAndUpdateBook = useCreateAndUpdateBook(book)
  const myBook = useMyBook(book.googleBooksId)
  const { isValidating, data } = useMyBooks()

  const wantToRead = !!myBook && !myBook.finishedAt
  const hasBeenRead = !!myBook?.finishedAt

  const restartBook = useUpdateBook(myBook?.id, { finishedAt: null })
  const finishBook = useUpdateBook(myBook?.id, { finishedAt: new Date() })

  if (isValidating && !data) {
    return null
  }

  // TODO:
  // 1. Loading icon

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={!!myBook ? restartBook : createBook}
        className={`base ${wantToRead ? 'active' : 'default'}`}
      >
        <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Want to read
      </button>
      <button
        type="button"
        onClick={!!myBook ? finishBook : createAndUpdateBook}
        className={`base ${hasBeenRead ? 'active' : 'default'}`}
      >
        <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Read
      </button>
    </div>
  )
}

const useMyBook = (bookId) => {
  const { data } = useMyBooks()

  return data.books?.find((myBook) => myBook.googleBooksId === bookId)
}

const useMyBooks = () => {
  return useSWR<{ books: Book[] }>(`${BASE_API_ROUTE}/api/mybooks`)
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

const useUpdateBook = (bookId, updates) => {
  const { mutate } = useSWRConfig()

  if (!bookId) {
    return null
  }

  return async (e) => {
    e.preventDefault()

    try {
      await mutate(
        `${BASE_API_ROUTE}/api/update/${bookId}`,
        updateBook(bookId, updates)
      )
    } catch (error) {
      console.error(error)
    }

    await mutate(`${BASE_API_ROUTE}/api/mybooks`)
  }
}

const updateBook = async (id, updates) => {
  await fetch(`${BASE_API_ROUTE}/api/update/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
}

export default BookButtons

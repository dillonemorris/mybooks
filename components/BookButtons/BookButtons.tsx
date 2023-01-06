'use client'

import { Book } from '@prisma/client'
import { useState } from 'react'
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

// TODO: Change to enum
type Status = 'idle' | 'loading' | 'error' | 'success'

const BookButtons = ({ book }: BookButtonsProps) => {
  const [status, setStatus] = useState<Status>('idle')
  const createBook = useCreateBook(book, setStatus)
  const createAndUpdateBook = useCreateAndUpdateBook(book, setStatus)
  const myBook = useMyBook(book.googleBooksId)
  const { isValidating, data } = useMyBooks()

  const wantToRead = !!myBook && !myBook.finishedAt
  const hasBeenRead = !!myBook?.finishedAt

  const restartBook = useUpdateBook(myBook?.id, { finishedAt: null }, setStatus)
  const finishBook = useUpdateBook(
    myBook?.id,
    { finishedAt: new Date() },
    setStatus
  )

  if (isValidating && !data) {
    return null
  }

  // TODO: 1. Use loading heroicon and tailwind spin
  // 2. Support Error states
  // 3. Split create and update buttons into separate files (they should have isolated states and this file is officially a beastie boy)
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={!!myBook ? restartBook : createBook}
        className={`base ${wantToRead ? 'active' : 'default'}`}
      >
        <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        {status === 'loading' ? status : 'Want to read'}
      </button>
      <button
        type="button"
        onClick={!!myBook ? finishBook : createAndUpdateBook}
        className={`base ${hasBeenRead ? 'active' : 'default'}`}
      >
        <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        {status === 'loading' ? status : 'Read'}
      </button>
    </div>
  )
}

// TODO: Type
const useMyBook = (bookId) => {
  const { data } = useMyBooks()

  return data.books?.find((myBook) => myBook.googleBooksId === bookId)
}

const useMyBooks = () => {
  return useSWR<{ books: Book[] }>(`${BASE_API_ROUTE}/api/mybooks`)
}

// TODO: Type
const useCreateAndUpdateBook = (book, setStatus) => {
  const createBook = useCreateBook(
    {
      ...book,
      finishedAt: new Date(),
    },
    setStatus
  )

  return async (e) => {
    await createBook(e)
  }
}

// TODO: Type
const useCreateBook = (book, setStatus) => {
  const { mutate } = useSWRConfig()

  return async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await mutate(`${BASE_API_ROUTE}/api/book`, createBook(book))
    } catch (error) {
      console.error(error)
      setStatus('error')
    }

    await mutate(`${BASE_API_ROUTE}/api/mybooks`)
    setStatus('idle')
  }
}

const createBook = async (book) => {
  await fetch(`${BASE_API_ROUTE}/api/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  })
}

// TODO: Type
const useUpdateBook = (bookId, updates, setStatus) => {
  const { mutate } = useSWRConfig()

  if (!bookId) {
    return null
  }

  return async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await mutate(
        `${BASE_API_ROUTE}/api/update/${bookId}`,
        updateBook(bookId, updates)
      )
    } catch (error) {
      console.error(error)
      setStatus('error')
    }

    await mutate(`${BASE_API_ROUTE}/api/mybooks`)
    setStatus('idle')
  }
}

// TODO: Type
const updateBook = async (id, updates) => {
  await fetch(`${BASE_API_ROUTE}/api/update/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
}

export default BookButtons

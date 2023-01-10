import { useState } from 'react'
import { Book } from '@prisma/client'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import './style.css'
import { useCreateBook, useMyBook, useUpdateBook } from './hooks'

// TODO: Change to enum
type Status = 'idle' | 'loading' | 'error' | 'success'

type UpdateButtonProps = {
  book: {
    title: Book['title']
    authors: Book['authors']
    image: Book['image']
    googleBooksId: Book['googleBooksId']
  }
}

// TODO: Possibly abstract a base button we can pass props to
// so we don't have to import icons and apply styles twice
export const UpdateButton = ({ book }: UpdateButtonProps) => {
  const myBook = useMyBook(book.googleBooksId)
  const [status, setStatus] = useState<Status>('idle')
  const createAndUpdateBook = useCreateAndUpdateBook(book, setStatus)
  const hasBeenRead = !!myBook?.finishedAt
  const finishBook = useFinishBook(book, setStatus)

  return (
    <button
      type="button"
      onClick={!!myBook ? finishBook : createAndUpdateBook}
      className={`base ${hasBeenRead ? 'active' : 'default'}`}
    >
      {status === 'loading' ? (
        <ArrowPathIcon
          className="animate-spin -ml-1 mr-2 h-5 w-5"
          aria-hidden="true"
        />
      ) : (
        <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      )}
      Read
    </button>
  )
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

const useFinishBook = (book, setStatus) => {
  const myBook = useMyBook(book.googleBooksId)

  return useUpdateBook(myBook?.id, { finishedAt: new Date() }, setStatus)
}

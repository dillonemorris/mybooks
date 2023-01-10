import { useState } from 'react'
import { Book } from '@prisma/client'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import './style.css'
import { useCreateBook, useMyBook, useUpdateBook } from './hooks'

// TODO: Change to enum
type Status = 'idle' | 'loading' | 'error' | 'success'

type CreateButtonProps = {
  book: {
    title: Book['title']
    authors: Book['authors']
    image: Book['image']
    googleBooksId: Book['googleBooksId']
  }
}

// TODO: Possibly abstract a base button we can pass props to
// so we don't have to import icons and apply styles twice
export const CreateButton = ({ book }: CreateButtonProps) => {
  const [status, setStatus] = useState<Status>('idle')
  const myBook = useMyBook(book.googleBooksId)
  const createBook = useCreateBook(book, setStatus)
  const wantToRead = !!myBook && !myBook.finishedAt
  const restartBook = useUpdateBook(myBook?.id, { finishedAt: null }, setStatus)

  return (
    <button
      type="button"
      onClick={!!myBook ? restartBook : createBook}
      className={`base ${wantToRead ? 'active' : 'default'}`}
    >
      {status === 'loading' ? (
        <ArrowPathIcon
          className="animate-spin -ml-1 mr-2 h-5 w-5"
          aria-hidden="true"
        />
      ) : (
        <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      )}
      Want to read
    </button>
  )
}

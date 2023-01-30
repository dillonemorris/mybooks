import { useState } from 'react'
import { Book } from '@prisma/client'
import './style.css'
import { useCreateBook, useMyBook, useUpdateBook } from './hooks'
import { Button } from './Button'

// TODO: Change to enum?
type Status = 'idle' | 'loading' | 'error' | 'success'

type UpdateButtonProps = {
  book: {
    title: Book['title']
    authors: Book['authors']
    image: Book['image']
    googleBooksId: Book['googleBooksId']
  }
}

export const UpdateButton = ({ book }: UpdateButtonProps) => {
  const myBook = useMyBook(book.googleBooksId)
  const [status, setStatus] = useState<Status>('idle')
  const createAndUpdateBook = useCreateAndUpdateBook(book, setStatus)
  const hasBeenRead = myBook?.finished
  const finishBook = useFinishBook(book, setStatus)

  return (
    <Button
      onClick={!!myBook ? finishBook : createAndUpdateBook}
      isActive={hasBeenRead}
      isLoading={status === 'loading'}
    >
      Read
    </Button>
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

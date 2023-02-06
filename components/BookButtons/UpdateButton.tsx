import { useState } from 'react'
import { Book } from '@prisma/client'
import './style.css'
import {
  Status,
  useCreateAndUpdateBook,
  useMyBook,
  useUpdateBook,
} from './hooks'
import { Button } from './Button'

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
  const [status, setStatus] = useState<Status>(Status.Idle)
  const createAndUpdateBook = useCreateAndUpdateBook(book, setStatus)
  const hasBeenRead = myBook?.finished
  const finishBook = useFinishBook(book.googleBooksId, setStatus)

  return (
    <Button
      onClick={!!myBook ? finishBook : createAndUpdateBook}
      isActive={hasBeenRead}
      isLoading={status === Status.Loading}
    >
      Read
    </Button>
  )
}

const useFinishBook = (bookId: string, setStatus) => {
  const myBook = useMyBook(bookId)

  return useUpdateBook({
    bookId: myBook?.id,
    finishedAt: new Date(),
    setStatus,
  })
}

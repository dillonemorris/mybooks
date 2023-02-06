import { useState } from 'react'
import { Book } from '@prisma/client'
import { Status, useCreateBook, useMyBook, useUpdateBook } from './hooks'
import { Button } from './Button'

type CreateButtonProps = {
  book: {
    title: Book['title']
    authors: Book['authors']
    image: Book['image']
    googleBooksId: Book['googleBooksId']
  }
}

export const CreateButton = ({ book }: CreateButtonProps) => {
  const [status, setStatus] = useState<Status>(Status.Idle)
  const myBook = useMyBook(book.googleBooksId)
  const createBook = useCreateBook(book, setStatus)
  const wantToRead = !!myBook && !myBook.finished
  const restartBook = useUpdateBook({
    bookId: myBook?.id,
    finishedAt: null,
    setStatus,
  })

  return (
    <Button
      onClick={!!myBook ? restartBook : createBook}
      isActive={wantToRead}
      isLoading={status === Status.Loading}
    >
      Want to read
    </Button>
  )
}

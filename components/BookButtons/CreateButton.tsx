import { useState } from 'react'
import { Book } from '@prisma/client'
import { useCreateBook, useMyBook, useUpdateBook } from './hooks'
import { Button } from './Button'

// TODO: Change to enum?
type Status = 'idle' | 'loading' | 'error' | 'success'

type CreateButtonProps = {
  book: {
    title: Book['title']
    authors: Book['authors']
    image: Book['image']
    googleBooksId: Book['googleBooksId']
  }
}

export const CreateButton = ({ book }: CreateButtonProps) => {
  const [status, setStatus] = useState<Status>('idle')
  const myBook = useMyBook(book.googleBooksId)
  const createBook = useCreateBook(book, setStatus)
  const wantToRead = !!myBook && !myBook.finished
  const restartBook = useUpdateBook(myBook?.id, { finishedAt: null }, setStatus)

  return (
    <Button
      onClick={!!myBook ? restartBook : createBook}
      isActive={wantToRead}
      isLoading={status === 'loading'}
    >
      Want to read
    </Button>
  )
}

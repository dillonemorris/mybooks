'use client'

import { Book } from '@prisma/client'
import './style.css'
import { CreateButton } from './CreateButton'
import { UpdateButton } from './UpdateButton'

type BookButtonsProps = {
  book: {
    title: Book['title']
    authors: Book['authors']
    image: Book['image']
    googleBooksId: Book['googleBooksId']
  }
}

const BookButtons = ({ book }: BookButtonsProps) => {
  return (
    <div className="flex gap-2">
      <CreateButton book={book} />
      <UpdateButton book={book} />
    </div>
  )
}

export default BookButtons

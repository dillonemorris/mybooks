import type { Book } from '@prisma/client'
import prisma from '../../lib/prisma'
import Link from 'next/link'

const getBooks = async () => {
  // TODO: Make it so we only fetch the ones with the
  // logged in userId as the userId
  // where: { userId: userId }
  const books: Book[] = await prisma.book.findMany()
  return books
}

const MyBooks = async () => {
  const books = await getBooks()

  return (
    <div>
      {books.map((book) => {
        return (
          <Link key={book.id} href={`mybooks/${book.id}`}>
            {book.title}
          </Link>
        )
      })}
    </div>
  )
}

export default MyBooks

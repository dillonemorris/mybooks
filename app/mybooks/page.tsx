import type { Book } from '@prisma/client'
import prisma from '../../lib/prisma'

const getBooks = async () => {
  // TODO: Make it so we only fetch the ones with the
  // logged in userId as the userId
  // where: { userId: userId }
  const books: Book[] = await prisma.book.findMany()
  return books
}

const MyBooks = async () => {
  const books = await getBooks()

  console.log(books)

  return (
    <div>
      <h1 className="text-4xl font-bold underline">Hello world 🌎</h1>
    </div>
  )
}

export default MyBooks

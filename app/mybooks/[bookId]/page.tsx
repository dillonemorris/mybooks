import type { Book } from '@prisma/client'
import prisma from '../../../lib/prisma'

const getBookById = async (id) => {
  // TODO: Make it so we only fetch the ones with the
  // logged in userId as the userId
  // where: { userId: userId }
  const book: Book = await prisma.book.findUnique({ where: { id } })
  return book
}

const Book = async ({ params }) => {
  const book = await getBookById(params.bookId)

  console.log(book)

  return (
    <div>
      <h1 className="text-4xl font-bold underline">{book.title}</h1>
    </div>
  )
}

export default Book

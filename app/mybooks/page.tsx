import type { Book } from '@prisma/client'
import prisma from '../../lib/prisma'
import Link from 'next/link'
import { Spacer } from '../../components/Spacer'
import { Fragment } from 'react'

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
    <div className="flex flex-col">
      {books.map((book) => {
        return (
          <Fragment key={book.id}>
            <Link href={`mybooks/${book.id}`} className="p-8 bg-white">
              <h2 className="text-black text-lg">{book.title}</h2>
              <p className="text-slate-500 text-md">{book.description}</p>
            </Link>
            <Spacer axis="vertical" />
          </Fragment>
        )
      })}
    </div>
  )
}

export default MyBooks

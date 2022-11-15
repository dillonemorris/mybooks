'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { Spacer } from '../../components/Spacer'

const MyBooks = () => {
  const books = []

  if (!books.length) {
    return <EmptyMyBooks />
  }

  // TODO: Render a MyBooksList that goes and fetches the user's books from the db
  return (
    <div className="flex flex-col">
      {books.map((book) => {
        return (
          <Fragment key={book.id}>
            <Link
              href={`mybooks/${book.id}`}
              className="p-8 bg-white rounded-md drop-shadow-sm"
            >
              <h2 className="text-black text-lg">{book.title}</h2>
              <p className="text-slate-500 text-md">{book.description}</p>
            </Link>
            <Spacer size={6} axis="vertical" />
          </Fragment>
        )
      })}
    </div>
  )
}

const EmptyMyBooks = () => {
  return (
    <h2>
      Go <Link href="/discover">discover</Link> some books!
    </h2>
  )
}

export default MyBooks

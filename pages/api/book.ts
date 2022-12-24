import { Book } from '@prisma/client'
import { getSession } from 'next-auth/react'
import prisma from '../../lib/prisma'
import { IncomingMessage } from 'http'

export default async function handle(
  req: IncomingMessage & { body: Book },
  res
) {
  const { title, authors, image, googleBooksId } = req.body

  const session = await getSession({ req })
  const result = await prisma.book.create({
    data: {
      title,
      authors,
      image,
      user: { connect: { email: session?.user?.email } },
      googleBooksId,
    },
  })

  res.json(result)
}

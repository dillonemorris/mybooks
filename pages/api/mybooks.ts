import { getSession } from 'next-auth/react'
import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    res.statusCode = 403
    return { books: [] }
  }

  if (req.method === 'GET') {
    const books = await prisma.book.findMany({
      where: {
        user: { email: session.user.email },
      },
    })

    res.json(books)
  }
}

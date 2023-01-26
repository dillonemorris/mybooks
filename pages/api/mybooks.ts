import { getSession } from 'next-auth/react'
import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    res.status(403).json({ books: [] })
  }

  try {
    const response = await prisma.book.findMany({
      where: {
        user: { email: session.user.email },
        title: { contains: req.query.q, mode: 'insensitive' },
        ...(!!req.query.read && {
          finished: { equals: req.query.read === 'true' },
        }),
      },
    })

    const books = response || []

    res.status(200).json({ books })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}

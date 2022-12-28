import prisma from '../../../lib/prisma'

// PUT /api/publish/:id
export default async function handle(req, res) {
  const bookId = req.query.id
  const book = await prisma.book.update({
    where: { id: bookId },
    data: { finishedAt: new Date() },
  })

  res.json(book)
}

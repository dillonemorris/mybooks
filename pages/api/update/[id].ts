import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const bookId = req.query.id
  const { finishedAt } = req.body

  const book = await prisma.book.update({
    where: { id: bookId },
    data: { finishedAt },
  })

  res.json(book)
}

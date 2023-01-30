import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { id } = req.query

  if (req.method === 'DELETE') {
    const book = await prisma.book.delete({
      where: { id },
    })
    res.json(book)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

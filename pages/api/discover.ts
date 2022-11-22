import { books } from '@googleapis/books'

export default async function handler(req, res) {
  const booksApi = await books({
    version: 'v1',
    auth: process.env.GOOGLE_BOOKS_API_KEY,
  })

  try {
    const response = await booksApi.volumes.list({
      q: `intitle:${req.query.search}`,
      printType: 'books',
      maxResults: 10,
    })

    res.status(200).json({ books: response.data.items })
  } catch (error) {
    res.status(500).json({ error })
  }
}

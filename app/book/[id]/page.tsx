import { books } from '@googleapis/books'
import { PageLayout } from '../../../components/PageLayout'

const getBookById = async (id) => {
  const booksApi = await books({
    version: 'v1',
    auth: process.env.GOOGLE_BOOKS_API_KEY,
  })

  try {
    const response = await booksApi.volumes.get({ volumeId: id })

    return response.data
  } catch (error) {
    return error
  }
}

// TODO: Can we fetch the google books info on the server?
const Book = async ({ params }) => {
  const book = await getBookById(params.id)

  return <h2>{book.volumeInfo.authors[0]}</h2>
}

export default Book

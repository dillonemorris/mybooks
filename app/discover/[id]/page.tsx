import { books } from '@googleapis/books'
import { Rating } from '../../../components/Rating'
import { BookDetail } from '../../../components/BookDetail'

const Book = async ({ params }) => {
  const book = await getBookById(params.id)
  const { authors, title, imageLinks, description } = book.volumeInfo
  const image = imageLinks?.thumbnail
  const rating = book.volumeInfo?.averageRating
  const ratingsCount = book.volumeInfo?.ratingsCount

  return (
    <BookDetail
      book={{
        title,
        image,
        authors,
        description,
        googleBooksId: params.id,
      }}
    >
      {!!rating ? <Rating ratingsCount={ratingsCount} rating={rating} /> : null}
    </BookDetail>
  )
}

const getBookById = async (id) => {
  const booksApi = await books({
    version: 'v1',
    auth: process.env.GOOGLE_BOOKS_API_KEY,
  })

  try {
    const response = await booksApi.volumes.get({ volumeId: id })

    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default Book

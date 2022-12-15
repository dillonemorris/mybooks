import { books } from '@googleapis/books'
import { BookButtons } from '../../../components/BookListItem/BookButtons'
import { Rating } from '../../../components/Rating'

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

const Book = async ({ params }) => {
  const book = await getBookById(params.id)

  // TODO: This should use logic for author display in BookListItem
  const author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : ''

  const image = book.volumeInfo?.imageLinks?.thumbnail

  return (
    <div className="flex flex-col gap-4">
      <img
        className="rounded-lg border-4 border-slate-100 w-36 h-50"
        src={image}
      />
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
        {book.volumeInfo.title}
      </h2>
      <h3 className="text-gray-600 text-md sm:text-lg">{author}</h3>
      <Rating />
      <p className="text-gray-600 text-md max-w-screen-md">
        {book.volumeInfo.description}
      </p>
      {/*TODO: UI Change: Move these up in line with the image */}
      {/*<BookButtons*/}
      {/*  book={{*/}
      {/*    title: book.volumeInfo.title,*/}
      {/*    authors: book.volumeInfo.authors,*/}
      {/*    image,*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  )

  return null
}

export default Book

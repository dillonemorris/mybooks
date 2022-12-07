import { books } from '@googleapis/books'
import { StarIcon } from '@heroicons/react/20/solid'
import { BookButtons } from '../../../components/BookListItem/BookButtons'

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

  // TODO: create fallback image
  const imageUrl = book.volumeInfo.imageLinks?.thumbnail || ''

  // TODO: This should convert the string of author arrays
  // to join them with an &
  const author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : ''

  return (
    <div className="flex flex-col gap-4">
      <img
        className="rounded-lg border-4 border-slate-100 w-36 h-50"
        src={imageUrl}
      />
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
        {book.volumeInfo.title}
      </h2>
      <h3 className="text-gray-600 text-md sm:text-lg">{author}</h3>
      <div className="flex gap-1 py-2">
        <StarIcon className="w-8 h-8 text-gray-900" />
        <StarIcon className="w-8 h-8 text-gray-900" />
        <StarIcon className="w-8 h-8 text-gray-900" />
        <StarIcon className="w-8 h-8 text-gray-900" />
        <StarIcon className="w-8 h-8 text-gray-300" />
      </div>
      <p className="text-gray-600 text-md max-w-screen-md">
        {book.volumeInfo.description}
      </p>
      {/*TODO: These can probably be moved up in line with the image */}
      <BookButtons />
    </div>
  )

  return null
}

export default Book

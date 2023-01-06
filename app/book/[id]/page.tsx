import { books } from '@googleapis/books'
import { Rating } from '../../../components/Rating'
import convertAuthorsToString from '../../../utils/convertAuthorsToString'
import dynamic from 'next/dynamic'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const BookButtons = dynamic(() => import('../../../components/BookButtons'), {
  ssr: false,
  // TODO: Change to button skeleton (must be created)
  loading: () => <ButtonsSkeleton />,
})

const Book = async ({ params }) => {
  const book = await getBookById(params.id)
  const { authors, title, imageLinks } = book.volumeInfo
  const image = imageLinks?.thumbnail

  return (
    <div className="flex flex-col gap-4">
      <img
        className="rounded-lg border-4 border-slate-100 w-36 h-50"
        src={image}
      />
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
        {book.volumeInfo.title}
      </h2>
      <h3 className="text-gray-600 text-md sm:text-lg">
        {convertAuthorsToString(authors)}
      </h3>
      <Rating />
      <p className="text-gray-600 text-md max-w-screen-md">
        {book.volumeInfo.description}
      </p>

      <BookButtons
        book={{
          title,
          authors,
          image,
          googleBooksId: params.id,
        }}
      />
    </div>
  )
}

const ButtonsSkeleton = () => {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="inline-flex items-center text-xs font-medium border border-transparent shadow-sm rounded px-2.5 py-1.5 text-xs shadow-sm bg-slate-200 text-gray-600"
      >
        <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Want to read
      </button>
      <button
        type="button"
        className="inline-flex items-center text-xs font-medium border border-transparent shadow-sm rounded px-2.5 py-1.5 text-xs shadow-sm bg-slate-200 text-gray-600"
      >
        <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Read
      </button>
    </div>
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

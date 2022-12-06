import { books } from '@googleapis/books'

const getBookById = async (id) => {
  const booksApi = await books({
    version: 'v1',
    auth: process.env.GOOGLE_BOOKS_API_KEY,
  })

  try {
    const response = await booksApi.volumes.get({ volumeId: id })

    console.log({ response })

    return response.data
  } catch (error) {
    console.log(error)
  }
}

const Book = async ({ params }) => {
  const book = await getBookById(params.id)

  // TODO: create fallback image
  const imageUrl = book.volumeInfo.imageLinks?.thumbnail || ''

  return (
    <div>
      <img className="rounded-lg border-4 border-slate-100" src={imageUrl} />
    </div>
  )
}

export default Book

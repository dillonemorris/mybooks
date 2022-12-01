import { books } from '@googleapis/books'
import { BookList } from '../../components/BookList'
import { BookListItem } from '../../components/BookListItem'
import { BookOpenIcon } from '@heroicons/react/20/solid'
import { SearchInput } from '../../components/SearchInput'

const getBooks = async (query) => {
  const booksApi = await books({
    version: 'v1',
    auth: process.env.GOOGLE_BOOKS_API_KEY,
  })

  if (!query) {
    return { books: [] }
  }

  try {
    const response = await booksApi.volumes.list({
      q: `intitle:${query}`,
      printType: 'books',
      maxResults: 10,
    })

    return { books: response.data.items }
  } catch (error) {
    return error
  }
}

const Discover = async ({ searchParams }) => {
  const data = await getBooks(searchParams.q)
  const { books } = data

  if (!books?.length) {
    return (
      <div className="text-center py-12 max-w-sm mx-auto">
        <BookOpenIcon
          className="mx-auto h-12 w-12 text-gray-400"
          aria-hidden="true"
        />

        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No books found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Try entering a new or different search below
        </p>
        <div className="mt-6">
          <SearchInput />
        </div>
      </div>
    )
  }

  return (
    <BookList>
      {books.map((book) => {
        console.log(book)
        // TODO: This should convert the string of author arrays
        // to join them with an &
        const author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : ''
        return (
          <BookListItem
            key={book.id}
            href={`/book/${book.id}`}
            title={book.volumeInfo.title}
            author={author}
            imageUrl={book.volumeInfo?.imageLinks?.thumbnail}
          />
        )
      })}
    </BookList>
  )
}

export default Discover

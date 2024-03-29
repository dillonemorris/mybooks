import { books } from '@googleapis/books'
import { BookOpenIcon } from '@heroicons/react/20/solid'
import { BookList } from '../../components/BookList'
import { SearchInput } from '../../components/SearchInput'
import { BookListItem } from '../../components/BookListItem'

const Discover = async ({ searchParams }) => {
  const data = await getBooksBySearch(searchParams.q)
  const { books } = data

  if (!books?.length) {
    return (
      <div className="text-center py-32 max-w-sm mx-auto">
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
        return (
          <BookListItem
            key={book.id}
            book={{
              href: `/discover/${book.id}`,
              title: book.volumeInfo.title,
              authors: book.volumeInfo.authors,
              image: book.volumeInfo?.imageLinks?.thumbnail,
              googleBooksId: book.id,
              rating: book.volumeInfo?.averageRating,
              ratingsCount: book.volumeInfo?.ratingsCount,
            }}
          />
        )
      })}
    </BookList>
  )
}

const getBooksBySearch = async (query) => {
  const booksApi = await books({
    version: 'v1',
    auth: process.env.GOOGLE_BOOKS_API_KEY,
  })

  try {
    const response = await booksApi.volumes.list({
      q: query ? `intitle:${query}` : null,
      printType: 'books',
      maxResults: 20,
    })

    return { books: response.data.items }
  } catch (error) {
    return error
  }
}

export default Discover

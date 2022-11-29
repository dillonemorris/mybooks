import { books } from '@googleapis/books'
import { BookList } from '../../components/BookList'
import { BookListItem } from '../../components/BookListItem'
import Link from 'next/link'

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

// TODO:
// When a search is entered into the input,
// there's a route change and a query comes through here as a param.
// With that param we fetch the results and server render them.
const Discover = async ({ searchParams }) => {
  const data = await getBooks(searchParams.q)
  const { books } = data
  const query = 'Lizzo'

  if (!books.length) {
    // TODO: Use tailwind UI component here
    return (
      <Link
        href={{
          pathname: '/discover',
          query: { q: query },
        }}
      >
        Search for {query} books
      </Link>
    )
  }

  // TODO: Search input and empty state
  return (
    <BookList>
      <Link
        href={{
          pathname: '/discover',
          query: { q: 'Series of unfortunate events' },
        }}
      >
        Search for books
      </Link>
      {books.map((book) => {
        return (
          <BookListItem
            key={book.id}
            // TODO: Change to `discover/${id}` after creating page
            href={`mybooks/${book.id}`}
            title={book.volumeInfo.title}
            // TODO: Decode this string if we are going to use it
            description={book.volumeInfo.description}
          />
        )
      })}
    </BookList>
  )
}

export default Discover

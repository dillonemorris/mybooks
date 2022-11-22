'use client'

import useSWR from 'swr'
import { BookList } from '../../components/BookList'
import { BookListItem } from '../../components/BookListItem'

const Discover = () => {
  const query = 'harry potter sorcerer'
  const { data } = useSWR(`/api/discover?search=${query}`)
  const { books } = data

  return (
    <BookList>
      {books.map((book) => {
        return (
          <BookListItem
            key={book.id}
            // TODO: Change to `discover/${id}` after creating page
            href={`mybooks/${book.id}`}
            title={book.volumeInfo.title}
            // TODO: Decode this string if we are going to use it
            description={book.searchInfo.textSnippet}
          />
        )
      })}
    </BookList>
  )
}

export default Discover

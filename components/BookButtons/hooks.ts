import useSWR, { useSWRConfig } from 'swr'
import { BASE_API_ROUTE } from '../../config'
import { Book } from '@prisma/client'

// TODO: Type
const useMyBook = (bookId) => {
  const { data } = useMyBooks()

  return data.books?.find((myBook) => myBook.googleBooksId === bookId)
}

const useMyBooks = () => {
  return useSWR<{ books: Book[] }>(`${BASE_API_ROUTE}/api/mybooks`)
}

// TODO: Type
const useCreateBook = (book, setStatus) => {
  const { mutate } = useSWRConfig()

  return async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await mutate(`${BASE_API_ROUTE}/api/book`, createBook(book))
    } catch (error) {
      console.error(error)
      setStatus('error')
    }

    await mutate(`${BASE_API_ROUTE}/api/mybooks`)
    setStatus('idle')
  }
}

const createBook = async (book) => {
  await fetch(`${BASE_API_ROUTE}/api/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  })
}

// TODO: Type
const useUpdateBook = (bookId, updates, setStatus) => {
  const { mutate } = useSWRConfig()

  if (!bookId) {
    return null
  }

  return async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await mutate(
        `${BASE_API_ROUTE}/api/update/${bookId}`,
        updateBook(bookId, updates)
      )
    } catch (error) {
      console.error(error)
      setStatus('error')
    }

    await mutate(`${BASE_API_ROUTE}/api/mybooks`)
    setStatus('idle')
  }
}

// TODO: Type
const updateBook = async (id, updates) => {
  await fetch(`${BASE_API_ROUTE}/api/update/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
}

export { useUpdateBook, useCreateBook, useMyBook }

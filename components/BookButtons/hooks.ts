import useSWR, { useSWRConfig } from 'swr'
import { BASE_API_ROUTE } from '../../config'
import { Book } from '@prisma/client'

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
}

const useMyBook = (bookId: Book['googleBooksId']) => {
  const { data } = useMyBooks()

  return data.books?.find((myBook) => myBook.googleBooksId === bookId)
}

const useMyBooks = () => {
  return useSWR<{ books: Book[] }>(`${BASE_API_ROUTE}/api/mybooks`)
}

type NewBook = {
  title: Book['title']
  authors: Book['authors']
  image: Book['image']
  googleBooksId: Book['googleBooksId']
  finishedAt?: Book['finishedAt']
}

const useCreateBook = (book: NewBook, setStatus: (s: Status) => void) => {
  const { mutate } = useSWRConfig()

  return async (e) => {
    e.preventDefault()
    setStatus(Status.Loading)

    try {
      await mutate(`${BASE_API_ROUTE}/api/book`, createBook(book))
    } catch (error) {
      console.error(error)
      setStatus(Status.Error)
    }

    await mutate(`${BASE_API_ROUTE}/api/mybooks`)
    setStatus(Status.Idle)
  }
}

const createBook = async (book: NewBook) => {
  await fetch(`${BASE_API_ROUTE}/api/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  })
}

type UpdateHookArgs = {
  bookId: string
  finishedAt?: Date
  setStatus: (s: Status) => void
}

const useUpdateBook = ({ bookId, finishedAt, setStatus }: UpdateHookArgs) => {
  const { mutate } = useSWRConfig()

  if (!bookId) {
    return null
  }

  return async (e) => {
    e.preventDefault()
    setStatus(Status.Loading)

    try {
      await mutate(
        `${BASE_API_ROUTE}/api/update/${bookId}`,
        updateBook(bookId, finishedAt)
      )
    } catch (error) {
      console.error(error)
      setStatus(Status.Error)
    }

    await mutate(`${BASE_API_ROUTE}/api/mybooks`)
    setStatus(Status.Idle)
  }
}

const updateBook = async (id: string, finishedAt?: Date) => {
  await fetch(`${BASE_API_ROUTE}/api/update/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ finishedAt }),
  })
}

export const useCreateAndUpdateBook = (book: NewBook, setStatus) => {
  const createBook = useCreateBook(
    {
      ...book,
      finishedAt: new Date(),
    },
    setStatus
  )

  return async (e) => {
    await createBook(e)
  }
}

export { useUpdateBook, useCreateBook, useMyBook }

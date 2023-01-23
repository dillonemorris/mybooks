import dynamic from 'next/dynamic'
import { Book } from '@prisma/client'
import { ButtonsLoading } from '../ButtonsLoading'
import convertAuthorsToDisplay from '../../utils/convertAuthorsToDisplay'

const BookButtons = dynamic(() => import('../../components/BookButtons'), {
  ssr: false,
  loading: ButtonsLoading,
})

type BookDetailProps = React.PropsWithChildren<{
  book: {
    image: Book['image']
    title: Book['title']
    authors: Book['authors']
    googleBooksId: Book['googleBooksId']
    description: string
  }
}>

export const BookDetail = ({ book, children }: BookDetailProps) => {
  const { title, authors, image, googleBooksId, description } = book

  return (
    <div className="flex flex-col gap-4 pt-8">
      <img
        className="rounded-lg border-4 border-slate-100 w-36 h-50"
        src={image}
      />
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">{title}</h2>
      <h3 className="text-gray-600 text-md sm:text-lg">
        {convertAuthorsToDisplay(authors)}
      </h3>
      {children}
      <p className="text-gray-600 text-md max-w-screen-md">{description}</p>

      <BookButtons
        book={{
          title,
          authors,
          image,
          googleBooksId,
        }}
      />
    </div>
  )
}

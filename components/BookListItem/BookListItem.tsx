import Link from 'next/link'
import dynamic from 'next/dynamic'
import { RatingStars } from '../Rating'
import convertAuthorsToDisplay from '../../utils/convertAuthorsToDisplay'
import { ButtonsLoading } from '../ButtonsLoading'

const BookButtons = dynamic(() => import('../BookButtons'), {
  ssr: false,
  loading: ButtonsLoading,
})

type BookListItemProps = {
  book: {
    href: string
    title: string
    image: string
    authors?: string[]
    googleBooksId?: string
    rating?: number
  }
}

export const BookListItem = ({ book }: BookListItemProps) => {
  const { href, title, image, authors, googleBooksId, rating } = book

  return (
    <li className="bg-white flex rounded-lg overflow-hidden shadow-sm">
      <Link href={href}>
        <img
          className="h-full flex-shrink-0 flex"
          style={{ maxWidth: '6.5em', minWidth: '6.5rem' }}
          src={image}
          alt={`${title} book cover`}
        />
      </Link>

      <div className="flex flex-col p-3 px-4">
        <a
          href={href}
          className="font-medium text-gray-900 hover:text-gray-600 text-md sm:text-lg"
        >
          {title}
        </a>
        <p className="sm:text-md text-sm text-gray-500">
          {convertAuthorsToDisplay(authors)}
        </p>

        {!!rating ? <RatingStars rating={rating} /> : null}

        <div className="mt-auto pt-2">
          {/*TODO: Type dynamically imported component*/}
          {/*@ts-ignore*/}
          <BookButtons book={{ title, authors, image, googleBooksId }} />
        </div>
      </div>
    </li>
  )
}

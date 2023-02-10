import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Rating } from '../Rating'
import convertAuthorsToDisplay from '../../utils/convertAuthorsToDisplay'
import { ButtonsLoading } from '../ButtonsLoading'

const BookButtons = dynamic(() => import('../BookButtons'), {
  ssr: false,
  loading: ButtonsLoading,
})

const Menu = dynamic(() => import('../Menu'), {
  ssr: false,
})

type BookListItemProps = {
  book: {
    href: string
    title: string
    image: string
    authors?: string[]
    googleBooksId?: string
    rating?: number
    ratingsCount?: number
  }
}

export const BookListItem = ({ book }: BookListItemProps) => {
  const { href, title, image, authors, googleBooksId, rating, ratingsCount } =
    book

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
        <p className="font-normal sm:text-md text-sm text-gray-900">
          by {convertAuthorsToDisplay(authors)}
        </p>

        {!!rating ? (
          <Rating rating={rating} ratingsCount={ratingsCount} />
        ) : null}

        <div className="mt-auto pt-2">
          {/*TODO: Type dynamically imported component*/}
          {/*@ts-ignore*/}
          <BookButtons book={{ title, authors, image, googleBooksId }} />
        </div>
      </div>
      <div className="ml-auto mx-1 my-3">
        <Menu bookId={googleBooksId} />
      </div>
    </li>
  )
}

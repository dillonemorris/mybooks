import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Rating } from '../Rating'
import convertAuthorsToString from '../../utils/convertAuthorsToString'
import { ButtonsLoading } from '../ButtonsLoading'

const BookButtons = dynamic(() => import('../BookButtons'), {
  ssr: false,
  loading: () => <ButtonsLoading />,
})

type BookListItemProps = {
  title: string
  authors?: string[]
  href: string
  image: string
  googleBooksId?: string
}

export const BookListItem = ({
  title,
  authors,
  href,
  image,
  googleBooksId,
}: BookListItemProps) => {
  return (
    <li className="bg-white flex rounded-lg overflow-hidden shadow-sm">
      {/*TODO: create image fallback (placeholder image) and change to next/image*/}
      <Link href={href}>
        <img
          className="h-full flex-shrink-0 flex"
          style={{ maxWidth: '6.5em', minWidth: '6.5rem' }}
          src={image}
          alt=""
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
          {convertAuthorsToString(authors)}
        </p>

        <Rating />

        <div className="mt-auto pt-2">
          <BookButtons book={{ title, authors, image, googleBooksId }} />
        </div>
      </div>
    </li>
  )
}

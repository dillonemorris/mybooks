import Link from 'next/link'
import { BookButtons as Buttons } from './BookButtons'
import { Rating } from '../Rating'

type BookListItemProps = {
  title: string
  authors?: string[]
  href: string
  image: string
}

export const BookListItem = ({
  title,
  authors,
  href,
  image,
}: BookListItemProps) => {
  // TODO: Convert to reusable function
  const author =
    {
      0: '',
      1: authors[0],
      2: authors.slice(-2).join(' & '),
    }[authors.length] ||
    `${authors.slice(0, -2).join(', ')}${authors.slice(-2).join(' & ')}`

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
        <p className="sm:text-md text-sm text-gray-500">{author}</p>

        <Rating />

        <div className="mt-auto pt-2">
          {/*<Buttons book={{ title, authors, image }} />*/}
        </div>
      </div>
    </li>
  )
}

import Link from 'next/link'
import { BookButtons as Buttons } from './BookButtons'

type BookListItemProps = {
  title: string
  author: string
  href: string
  imageUrl: string
}

export const BookListItem = ({
  title,
  author,
  href,
  imageUrl,
}: BookListItemProps) => {
  return (
    <li className="bg-white flex rounded-lg overflow-hidden shadow-sm">
      {/*TODO: create image fallback (placeholder image)*/}
      <Link href={href}>
        <img
          className="h-full flex-shrink-0 flex"
          style={{ maxWidth: '5rem', minWidth: '5rem' }}
          src={imageUrl}
          alt=""
        />
      </Link>

      <div className="flex flex-col p-2 px-3">
        <a
          href={href}
          className="font-medium text-gray-900 hover:text-gray-600 text-md"
        >
          {title}
        </a>
        <p className="sm:text-md text-sm text-gray-500">{author}</p>
        <div className="mt-auto pt-2">
          <Buttons />
        </div>
      </div>
    </li>
  )
}

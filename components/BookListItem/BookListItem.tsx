import Link from 'next/link'
import { BookButtons as Buttons } from './BookButtons'
import { StarIcon } from '@heroicons/react/20/solid'

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
          style={{ maxWidth: '6.5em', minWidth: '6.5rem' }}
          src={imageUrl}
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

        <div className="flex gap-1 py-2">
          <StarIcon className="w-4 h-4 text-gray-900" />
          <StarIcon className="w-4 h-4 text-gray-900" />
          <StarIcon className="w-4 h-4 text-gray-900" />
          <StarIcon className="w-4 h-4 text-gray-900" />
          <StarIcon className="w-4 h-4 text-gray-300" />
        </div>

        <div className="mt-auto pt-2">
          <Buttons />
        </div>
      </div>
    </li>
  )
}

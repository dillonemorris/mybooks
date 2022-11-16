import Link from 'next/link'

type BookListItemProps = {
  title: string
  description: string
  href: string
}

export const BookListItem = ({
  title,
  description,
  href,
}: BookListItemProps) => {
  return (
    <li>
      <Link className="flex py-4 sm:py-7 px-3 sm:px-6 lg:px-8" href={href}>
        <img
          className="h-12 w-12 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div className="ml-3">
          <p className="sm:text-lg text-md font-medium text-gray-900">
            {title}
          </p>
          <p className="sm:text-md text-sm text-gray-500">{description}</p>
        </div>
      </Link>
    </li>
  )
}

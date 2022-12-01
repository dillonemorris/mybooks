import Link from 'next/link'

type BookListItemProps = {
  title: string
  author: string
  href: string
  imageUrl: string
}

// TODO: Display rating stars
// Accept an optional prop for the rating and render a star icon for each
// Also display the count of ratings (ratingsCount)
export const BookListItem = ({
  title,
  author,
  href,
  imageUrl,
}: BookListItemProps) => {
  return (
    <li>
      <Link className="flex py-4 sm:py-7 px-3 sm:px-6 lg:px-8" href={href}>
        {/*TODO: create image fallback (placeholder image)*/}
        <img className="h-24 w-18" src={imageUrl} alt="" />
        <div className="ml-3">
          <h3 className="sm:text-lg text-md font-medium text-gray-900">
            {title}
          </h3>
          <p className="sm:text-md text-sm text-gray-500">{author}</p>
        </div>
      </Link>
    </li>
  )
}

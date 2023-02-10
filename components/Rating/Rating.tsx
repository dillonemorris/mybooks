const MAX_RATING = 5

const array = Array.from({ length: MAX_RATING })

type RatingProps = { rating: number; ratingsCount: number }

export const Rating = ({ rating, ratingsCount }: RatingProps) => {
  return (
    <div className="flex items-center gap-1 py-2">
      {array.map((_, i) => {
        return (
          <Star key={i} isFull={i + 1 <= rating} isHalf={i + 0.5 === rating} />
        )
      })}
      <span className="font-light text-sm ml-1 text-gray-700">{rating}</span>
      <span className="font-light text-sm ml-1 text-gray-700">
        ({ratingsCount} rating{ratingsCount > 1 ? 's' : null})
      </span>
    </div>
  )
}

type StarProps = {
  isFull: boolean
  isHalf: boolean
}

const Star = ({ isFull, isHalf }: StarProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`w-4 h-4 ${isFull ? 'text-amber-500' : 'text-slate-200'}`}
    >
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>
      <path
        fill={isHalf ? 'url(#half)' : null}
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
      />
    </svg>
  )
}

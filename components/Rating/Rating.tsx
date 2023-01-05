import { StarIcon } from '@heroicons/react/20/solid'

const MAX_RATING_COUNT = 5

const array = Array.from({ length: MAX_RATING_COUNT })

type RatingProps = { rating?: number }

export const Rating = ({ rating = 3 }: RatingProps) => {
  return (
    <div className="flex gap-1 py-2">
      {array.map((_, i) => {
        const isFilled = i + 1 <= rating
        return (
          <StarIcon
            key={i}
            className={`w-4 h-4 hover:text-gray-900 cursor-pointer ${
              isFilled ? 'text-slate-900' : 'text-slate-300'
            }`}
          />
        )
      })}
    </div>
  )
}

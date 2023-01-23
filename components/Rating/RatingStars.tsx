import { StarIcon } from '@heroicons/react/20/solid'

const MAX_RATING_COUNT = 5

const array = Array.from({ length: MAX_RATING_COUNT })

type RatingProps = { rating: number }

export const RatingStars = ({ rating }: RatingProps) => {
  return (
    <div className="flex gap-1 py-2">
      {array.map((_, i) => {
        // TODO: Account for .5 ratings (display half-filled star)
        const isFilled = i + 1 <= rating
        return (
          <StarIcon
            key={i}
            className={`w-4 h-4 ${
              isFilled ? 'text-slate-900' : 'text-slate-300'
            }`}
          />
        )
      })}
    </div>
  )
}

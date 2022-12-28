import { StarIcon } from '@heroicons/react/20/solid'
import { classNames } from '../../utils/classNames'

const MAX_RATING_COUNT = 5

const array = Array.from({ length: MAX_RATING_COUNT })

export const Rating = () => {
  // TODO: Change to prop?
  const rating = 3

  return (
    <div className="flex gap-1 py-2">
      {array.map((_, i) => {
        const isFilled = i + 1 <= rating
        return (
          <StarIcon
            key={i}
            className={classNames(
              'w-4 h-4 hover:text-gray-900 cursor-pointer',
              isFilled ? 'text-gray-900' : 'text-gray-300'
            )}
          />
        )
      })}
    </div>
  )
}

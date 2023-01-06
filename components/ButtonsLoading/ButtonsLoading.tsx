import { CheckCircleIcon } from '@heroicons/react/24/outline'

export const ButtonsLoading = () => {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="inline-flex items-center text-xs font-medium border border-transparent shadow-sm rounded px-2.5 py-1.5 text-xs shadow-sm bg-slate-200 text-gray-600"
      >
        <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Want to read
      </button>
      <button
        type="button"
        className="inline-flex items-center text-xs font-medium border border-transparent shadow-sm rounded px-2.5 py-1.5 text-xs shadow-sm bg-slate-200 text-gray-600"
      >
        <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Read
      </button>
    </div>
  )
}

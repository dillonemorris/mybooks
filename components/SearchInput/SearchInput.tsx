import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

// TODO: Make the style customizable
// Possibly by allowing consumer to pass a `className` that goes to the input?
export const SearchInput = () => {
  return (
    <div className="px-2 lg:px-6">
      <label htmlFor="search" className="sr-only">
        Search books
      </label>
      <div className="relative text-blue-200 focus-within:text-gray-400">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <form>
          <input
            id="search"
            name="q"
            className="block w-full rounded-md border border-transparent bg-blue-400 bg-opacity-25 py-2 pl-10 pr-3 leading-5 text-blue-100 placeholder-blue-200 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
            placeholder="Search by title"
            type="search"
          />
        </form>
      </div>
    </div>
  )
}

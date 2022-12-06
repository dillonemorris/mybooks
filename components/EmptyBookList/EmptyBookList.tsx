const EMPTY_ITEM_COUNT = 16
const items = Array.from({ length: EMPTY_ITEM_COUNT })

export const EmptyBookList = () => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
      {items.map((item, i) => (
        <li
          key={i}
          className="bg-white flex rounded-lg overflow-hidden shadow-sm"
        >
          <div className="h-30 bg-white w-full rounded ml-3 " />
        </li>
      ))}
    </ul>
  )
}

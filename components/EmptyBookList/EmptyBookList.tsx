import { BookList } from '../BookList'

const EMPTY_ITEM_COUNT = 16
const items = Array.from({ length: EMPTY_ITEM_COUNT })

export const EmptyBookList = () => {
  return (
    <BookList>
      {items.map((item, i) => (
        <li
          key={i}
          className="bg-white flex rounded-lg h-36 shadow-sm overflow-hidden"
        >
          <div className="w-36 bg-slate-100"></div>
          <div className="bg-white w-full rounded-lg ml-3 " />
        </li>
      ))}
    </BookList>
  )
}

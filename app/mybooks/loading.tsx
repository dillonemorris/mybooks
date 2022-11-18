const items = Array.from({ length: 3 })

const Loading = () => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {items.map((item, i) => (
          <EmptyBookListItem key={i} />
        ))}
      </ul>
    </div>
  )
}

const EmptyBookListItem = () => {
  return (
    <li className="py-4 sm:py-7 px-3 sm:px-6 lg:px-8 flex">
      <div className="h-12 w-12 rounded-full bg-gray-100" />
      <div className="h-12 w-full bg-gray-100 rounded ml-3 " />
    </li>
  )
}

export default Loading

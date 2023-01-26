export const BookList = ({ children }) => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-2 sm:gap-4">
      {children}
    </ul>
  )
}

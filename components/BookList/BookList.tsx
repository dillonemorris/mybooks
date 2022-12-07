export const BookList = ({ children }) => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-5 sm:gap-6">
      {children}
    </ul>
  )
}

export const Header = ({ children }) => {
  return (
    <header className="pb-10">
      <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {children}
        </h1>
      </div>
    </header>
  )
}

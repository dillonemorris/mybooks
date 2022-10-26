import React from 'react'
import Link from 'next/link'

const Layout = ({ children }) => {
  return (
    <>
      <nav className="p-4">
        <Link className="p-4" href="/">
          My Books
        </Link>
        {/*TODO: Create discover page and link here*/}
        <Link className="p-4" href="/discover">
          Discover
        </Link>
      </nav>
      <main className="max-w-sm m-auto p-4">{children}</main>
    </>
  )
}

export default Layout

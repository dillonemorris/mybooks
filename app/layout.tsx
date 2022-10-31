import { Inter } from '@next/font/google'
import Link from 'next/link'
import './global.css'

const inter = Inter()

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <nav className="p-4">
          <Link className="p-4" href="/mybooks">
            My Books
          </Link>
          {/*TODO: Create discover page and link here*/}
          <Link className="p-4" href="/discover">
            Discover
          </Link>
        </nav>

        <main className="max-w-sm m-auto p-4">{children}</main>
      </body>
    </html>
  )
}

export default RootLayout

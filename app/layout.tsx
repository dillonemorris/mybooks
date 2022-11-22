import './global.css'
import { Inter } from '@next/font/google'
import { Providers } from './providers'
import { Nav } from './Nav'

const inter = Inter()

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-slate-100 h-full">
        <Providers>
          <div className="min-h-full">
            <div className="bg-blue-600 pb-48">
              <Nav />
            </div>

            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout

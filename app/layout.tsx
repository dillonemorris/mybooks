import './global.css'
import { Inter } from '@next/font/google'
import { AuthSessionProvider } from './AuthSessionProvider'
import { Nav } from './Nav'

const inter = Inter()

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-slate-100 h-full">
        <AuthSessionProvider>
          <div className="min-h-full">
            <div className="bg-blue-600 pb-48">
              <Nav />
            </div>

            {children}
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  )
}

export default RootLayout

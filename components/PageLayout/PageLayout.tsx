import { Header } from '../Header'

type PageLayoutProps = React.PropsWithChildren<{
  title: string
}>

export const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <main className="-mt-32">
      <Header>{title}</Header>
      <div className="mx-auto max-w-screen-lg px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          {children}
        </div>
      </div>
    </main>
  )
}

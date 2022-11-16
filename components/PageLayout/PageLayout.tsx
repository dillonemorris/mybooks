import { Header } from '../Header'

type PageLayoutProps = React.PropsWithChildren<{
  title: string
}>

export const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <main className="-mt-32">
      <Header>{title}</Header>
      <div className="mx-auto max-w-screen-md px-1 sm:px-0">
        <div className="rounded-lg bg-white shadow">{children}</div>
      </div>
    </main>
  )
}

import { Header } from '../Header'

type PageLayoutProps = React.PropsWithChildren<{
  title?: string
}>

export const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <main className="-mt-32">
      <Header>
        {title ? (
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {title}
          </h1>
        ) : null}
      </Header>
      <div className="mx-auto max-w-screen-lg px-2 lg:px-0">{children}</div>
    </main>
  )
}

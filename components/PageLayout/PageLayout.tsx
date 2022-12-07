type PageLayoutProps = React.PropsWithChildren<{
  title?: string
}>

export const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <main className="-mt-32">
      {title ? (
        <header className="pb-10 mx-auto max-w-screen-md px-2 lg:px-0">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {title}
          </h1>
        </header>
      ) : null}
      <div className="mx-auto max-w-screen-md px-2 lg:px-0">{children}</div>
    </main>
  )
}

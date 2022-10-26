import type { NextPage } from 'next'
import Head from 'next/head'

const Discover: NextPage = () => {
  return (
    <div>
      <Head>
        <title>mybooks | discover</title>
        <meta
          name="description"
          content="Search for books to add to your library"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl font-bold underline">Search for books.</h1>
      {/*TODO: Setup search with Google Books*/}
    </div>
  )
}

export default Discover

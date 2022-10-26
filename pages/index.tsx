import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>mybooks</title>
        <meta name="description" content="A place to search and add books" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl font-bold underline">Hello world.</h1>
    </div>
  )
}

export default Home

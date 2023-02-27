export const BASE_API_ROUTE =
  process.env.NODE_ENV === 'production'
    ? 'https://dillon-morris-mybooks.vercel.app'
    : 'http://localhost:3000'

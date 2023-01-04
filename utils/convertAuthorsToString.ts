export default function convertAuthorsToString(authors: string[]) {
  if (!authors?.length) {
    return ''
  }

  const concatMoreThanTwoAuthors = `${authors
    .slice(0, -2)
    .join(', ')}, ${authors.slice(-2).join(' & ')}`

  return (
    {
      0: '',
      1: authors[0],
      2: authors.slice(-2).join(' & '),
    }[authors.length] || concatMoreThanTwoAuthors
  )
}

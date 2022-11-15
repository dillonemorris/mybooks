import { useSession } from 'next-auth/react'

const emptyUser = { name: '', email: '', image: '' }

export const useUser = () => {
  const session = useSession()

  return session?.data ? session.data.user : emptyUser
}

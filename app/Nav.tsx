'use client'

import { Fragment } from 'react'
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { BookOpenIcon } from '@heroicons/react/20/solid'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useUser } from '../hooks/useUser'
import { usePathname } from 'next/navigation'
import { useIsLoggedIn } from '../hooks/useIsLoggedIn'
import { SearchInput } from '../components/SearchInput'

export const Nav = () => {
  const user = useUser()
  const navigation = useNavigation()
  const userNavigation = useUserNavigation()

  return (
    <Disclosure
      as="nav"
      className="border-b border-blue-300 border-opacity-25 bg-blue-600 lg:border-none"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-screen-lg">
            <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-blue-400 lg:border-opacity-25">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <BookOpenIcon className="mx-auto h-9 w-9 text-blue-300" />
                </div>
                <div className="hidden lg:ml-10 lg:block">
                  <div className="flex space-x-4">
                    <DesktopLinks />
                    <SearchInput type="primary" />
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-blue-600 p-2 text-blue-200 hover:bg-blue-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  <DesktopProfileDropdown />
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-blue-700 text-white'
                      : 'text-white hover:bg-blue-500 hover:bg-opacity-75',
                    'block rounded-md py-2 px-3 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-blue-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Avatar />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-blue-300">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-blue-500 hover:bg-opacity-75"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

const DesktopLinks = () => {
  const navigation = useNavigation()

  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? 'bg-blue-700 text-white'
              : 'text-white hover:bg-blue-500 hover:bg-opacity-75',
            'rounded-md py-2 px-3 text-sm font-medium'
          )}
          aria-current={item.current ? 'page' : undefined}
        >
          {item.name}
        </Link>
      ))}
    </>
  )
}

const DesktopProfileDropdown = () => {
  const userNavigation = useUserNavigation()
  return (
    <Menu as="div" className="relative ml-3 flex-shrink-0">
      <div>
        <Menu.Button className="flex rounded-full bg-blue-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
          <span className="sr-only">Open user menu</span>
          <Avatar />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  href={item.href}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block py-2 px-4 text-sm text-gray-700'
                  )}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const Avatar = () => {
  const user = useUser()

  if (!user?.image) {
    return <UserCircleIcon className="h-8 w-8 rounded-full" />
  }

  return <img className="h-10 w-10 rounded-full" src={user.image} alt="" />
}

const useUserNavigation = () => {
  const isLoggedIn = useIsLoggedIn()

  return isLoggedIn
    ? authenticatedUserNavigation
    : unAuthenticatedUserNavigation
}

const authenticatedUserNavigation = [
  { name: 'Sign out', href: 'api/auth/signout' },
]

const unAuthenticatedUserNavigation = [
  { name: 'Log in', href: 'api/auth/signin' },
]

const useNavigation = () => {
  const isPathname = useIsPathname()

  const navigation = [
    { name: 'My Books', href: '/mybooks', current: isPathname('/mybooks') },
    { name: 'Discover', href: '/discover', current: isPathname('/discover') },
  ]

  return navigation
}

const useIsPathname = () => {
  const routerPathname = usePathname()
  return (pathname: string) => routerPathname === pathname
}

// TODO: Move to util file
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

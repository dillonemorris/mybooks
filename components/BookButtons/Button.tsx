import React from 'react'
import './style.css'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

type ButtonProps = React.PropsWithChildren<{
  onClick: (e: any) => Promise<void>
  isActive: boolean
  isLoading: boolean
}>

export const Button = ({
  onClick,
  isActive,
  isLoading,
  children,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`base ${isActive ? 'active' : 'default'}`}
    >
      {isLoading ? (
        <ArrowPathIcon
          className="animate-spin -ml-1 mr-2 h-5 w-5"
          aria-hidden="true"
        />
      ) : (
        <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      )}
      {children}
    </button>
  )
}

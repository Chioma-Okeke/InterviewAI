import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {

    const error = useRouteError()

  return (
    <div className='p-4 bg-red-100 text-red-700 rounded-lg'>
        <h1>Oops! Something went wrong</h1>
        <p>{error.statusText || error.message}</p>
    </div>
  )
}

export default ErrorPage
import { IoChevronBackOutline } from 'react-icons/io5'
import Button from 'Components/Button'
import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import AppIcon from 'Components/AppIcon'

const Error = forwardRef(({ statusCode, ...rest }, ref) => {
  return (
    <div
      className='
        flex flex-col
        items-center justify-center
        max-w-screen-xl
        mx-auto
        py-24 sm:px-2 xl:px-0
        space-y-8
      '
    >
      <div className='max-w-lg flex flex-col space-y-3 items:center lg:items-start px-2 md:px-0'>
        <AppIcon size={2} />
        <h1 className='text-4xl font-bold text-center md:text-left'>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'this is not the page you are looking for...'}
        </h1>
        <p className='text-xl max-w-2xl text-center md:text-left'>
          If you think this page should exist, let me know or maybe just try again later
        </p>
        <Link
          href='/'
          className='rounded-md shadow self-start'
        >
          <Button className='space-x-1 self-center md:self-start rounded-full'>
            <IoChevronBackOutline />
            <span>
              home
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
})

Error.propTypes = {
  statusCode: PropTypes.any
}

export default Error

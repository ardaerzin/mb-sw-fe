import { useForm } from 'lib/hooks/useForm'
import Button from 'Components/Button'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { useState } from 'react'
import { m as motion } from 'framer-motion'
import Spinner from 'Components/Spinner'

const validations = {
  email: {
    pattern: {
      value: '/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i',
      message: 'please type in a valid email address'
    }
  }
}

const ErrorLabel = (props) => (
  <span
    className='
      text-xs font-sans font-medium
      bg-red-500 text-white
      p-1
    '
    {...props}
  />
)

const Label = (props) => (
  <label
    className='text-sm font-sans font-semibold'
    {...props}
  />
)

const Input = (props) => (
  <input
    className='
      border-0 border-b
      text-lg
      focus:outline-none focus:border-brand focus:ring-0
    '
    {...props}
  />
)

const AuthFormBase = ({ switchState, switchTo, state, ...rest }) => {
  const [loading, setLoading] = useState(false)
  const { handleSubmit, handleChange, handleFocus, handleBlur, data, errors, isValid } = useForm({
    validations,
    initialValues: { email: '', password: '' },
    onSubmit: async () => {
      // set loading
      setLoading(true)
      /**
       * send a post request to local api route, which then will perform a graph mutation
       * type: login or signup
       */
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: state })
      })
      // dynamically import writeStorage function becase it causes a crash on server-side
      const { writeStorage } = await import('@rehooks/local-storage')
      if (res.status === 200) {
        const { user } = await res.json()
        // save user data to local storage
        writeStorage('user', user)
        // redirect logged in user to home
        Router.push('/')
        setLoading(false)
      } else {
        // there was an error
        // notify user
        setLoading(false)
      }
    }
  })
  return (
    <form
      onSubmit={handleSubmit}
      className='
        flex flex-col items-center
        w-full
        max-w-lg
        p-4
        space-y-2
        bg-white
        rounded-md shadow-md
      '
      {...rest}
    >
      <div className='flex flex-col w-full'>
        <Label htmlFor=''>
          your email  
        </Label>
        <Input id='email' type='email' onFocus={handleFocus('email')} onBlur={handleBlur('email')} onChange={handleChange('email')} />
        {errors?.email && <ErrorLabel>{errors.email}</ErrorLabel>}
      </div>
      <div className='flex flex-col w-full'>
        <Label htmlFor=''>
          password
        </Label>
        <Input id='password' type='password' onFocus={handleFocus('password')} onBlur={handleBlur('password')} onChange={handleChange('password')} />
      </div>
      <div className='flex w-full justify-between items-center'>
        <span
          className='
            text-gray-500 text-sm
            cursor-pointer
          '
          onClick={() => switchState(switchTo)}
        >
          switch to {switchTo}
        </span>
        <Button type='submit' loading={loading} disabled={!isValid}>
          <motion.div
            className='relative'
            initial='start'
            animate={loading ? 'loading' : 'start'}
          >
            <motion.span
              variants={{
                start: { opacity: 1 },
                loading: { opacity: 0 }
              }}
            >
              {state}
            </motion.span>
            {
              loading && (
                <motion.div
                  className='text-2xl absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'
                  variants={{
                    start: { opacity: 0 },
                    loading: { opacity: 1 }
                  }}
                >
                  <Spinner />
                </motion.div>
              )
            }
          </motion.div>
        </Button>
      </div>
    </form>
  )
}

AuthFormBase.propTypes = {
  switchState: PropTypes.func.isRequired,
  switchTo: PropTypes.string.isRequired,
}

export default AuthFormBase

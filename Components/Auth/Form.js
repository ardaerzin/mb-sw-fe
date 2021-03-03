import { useForm } from 'lib/hooks/useForm'
import Button from 'Components/Button'
import PropTypes from 'prop-types'
import Router from 'next/router'

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
      text-sm font-sans font-medium
    bg-red-500 text-white
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
  const { handleSubmit, handleChange, handleFocus, handleBlur, data, errors, isValid } = useForm({
    validations,
    initialValues: { email: '', password: '' },
    onSubmit: async () => {
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
      } else {
        // there was an error
        // notify user
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
        rounded-md shadow-sm
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
        <Button type='submit' disabled={!isValid}>
          <span>
            {state}
          </span>
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

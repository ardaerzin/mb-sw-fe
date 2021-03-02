import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Cookies from 'universal-cookie'
import AuthFormBase from 'Components/Auth/Form'

const LoginPage = props => {
  const [authState, setAuthState] = useState('login')
  return (
    <div
      className='
        flex flex-col md:flex-row
        items-center justify-center
        space-y-8
        min-h-screen
        px-3 md:px-12
        md:space-x-12
      '
    >
      <div>
        <h1 className='text-4xl font-bold'>
          {
            authState === 'login' ?
              'login to access star wars character wiki' :
              'signup for star wars character wiki'
          }
        </h1>
        <p className='text-xl max-w-2xl mt-2'>
          Voluptate nisi quis sunt dolore non excepteur ut velit amet qui pariatur. Est do elit qui quis dolore quis. Amet tempor officia dolore quis dolore qui commodo labore.
        </p>
      </div>
      <AuthFormBase
        switchState={() => setAuthState(authState === 'login' ? 'signup' : 'login')}
        switchTo={authState === 'login' ? 'signup' : 'login'}
        state={authState}
      />
    </div>
  )
}

export async function getServerSideProps({ query, req, res, ...rest }) {
  var header = req && req.headers && req.headers.cookie
  var uc = new Cookies(header)
  const { userToken } = uc.getAll()

  if (userToken) {
    res.writeHead(302, { Location: '/' });
    res.end()
  }
  return {
    props: {
      data: {}
    }
  }
}


export default LoginPage

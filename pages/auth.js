import { useState } from 'react'
import PropTypes from 'prop-types'

import Cookies from 'universal-cookie'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import AppIcon from 'Components/AppIcon'

const AuthFormBase = dynamic(() => import('Components/Auth/Form'), { ssr: false })

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
      <NextSeo
        title='login'
        description='create an account or login to access StarWars Dex'
        openGraph={{
          url: `https://www.url.ie/auth`,
          title: 'login',
          description: 'create an account or login to access StarWars Dex',
          site_name: `StarWars Dex`
        }}
      />
      <div className='max-w-lg flex flex-col md:items-start space-y-2'>
        <AppIcon size={2} />
        <h1 className='text-4xl font-bold text-center md:text-left'>
          {
            authState === 'login' ?
              'Continue Your Discovery' :
              'Signup to Discover Star Wars Characters'
          }
        </h1>
        <p className='text-xl max-w-2xl mt-2 text-center md:text-left'>
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

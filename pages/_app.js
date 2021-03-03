import Header from 'Components/Header'
import { MotionConfig } from 'framer-motion'
import { DefaultSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import 'Styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [features, setFeatures] = useState([])
  useEffect(() => {
    import('lib/motionConfig').then(res => {
      setFeatures(res.default)
    })
  }, [])
  return (
    <MotionConfig features={features}>
      <DefaultSeo
        {
          ...{
            openGraph: {
              type: 'website',
              locale: 'en_us',
              url: 'https://www.sw-dex.com/',
              site_name: 'Star Wars Characters',
              titleTemplate: 'Next SEO | %s'
            },
            titleTemplate: 'SW Dex | %s'
          }
        }
      />
      <Header />
      <Component {...pageProps} />
    </MotionConfig>
  )
}

export default MyApp

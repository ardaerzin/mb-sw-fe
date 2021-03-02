import Header from 'Components/Header'
import { MotionConfig } from 'framer-motion'
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
      <Header />
      <Component {...pageProps} />
    </MotionConfig>
  )
}

export default MyApp

import { m as motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const LoadingCircle = (props) => (
  <motion.span
    style={{
      display: 'block',
      width: '0.25em',
      height: '0.25em',
      backgroundColor: '#fff',
      borderRadius: '0.125em'
    }}
    variants={{
      start: {
        opacity: 0.5,
        y: '0.4em'
      },
      end: {
        opacity: 1,
        y: '0.6em'
      }
    }}
    transition={{
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut'
    }}
  />
)

const ThreeDotsWave = (props) => {
  const [anim, setAnim] = useState(false)
  useEffect(() => {
    setAnim(true)
  }, [])
  return (
    <motion.div
      style={{
        width: '1em',
        height: '1em',
        display: 'flex',
        justifyContent: 'space-around'
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        staggerChildren: 0.2
      }}
      exit='start'
      initial='start'
      animate={anim ? 'end' : 'start'}
    >
      <LoadingCircle />
      <LoadingCircle />
      <LoadingCircle />
    </motion.div>
  )
}

export default ThreeDotsWave

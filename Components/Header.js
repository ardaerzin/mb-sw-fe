import { FaRebel } from 'react-icons/fa'

const Header = props => {
  return (
    <header
      className='
        sticky
        top-0
        z-50
        w-full
        py-2 px-2 md:px-8 xl:px-0
        bg-white
        shadow-lg
      '
    >
      <div
        className='mx-auto max-w-screen-xl w-full flex justify-between'
      >
        <div className='flex items-center space-x-1'>
          <div className='flex items-center justify-center'>
            <FaRebel
              className='text-2xl md:text-lg text-purple-500'
            />
          </div>
          <span className='hidden md:block font-semibold text-lg'>
            sw: legends
          </span>
        </div>
        <input
          type='text'
          placeholder='search here'
          className='
            border-b
            text-sm
            rounded-lg
            bg-transparent
            focus:outline-none focus:border-brand focus:ring-0
          '
        />
      </div>
    </header>
  )
}

Header.propTypes = {

}

export default Header

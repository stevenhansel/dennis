import { useRouter } from 'next/router'
import { useState } from 'react';

import useAudio from '../../../hooks/useAudio'

import ActiveLink from './ActiveLink'

const index = "/"
const episodes = "/episodes"

const Header = () => {
  const router = useRouter()

  const [whichWoof, setWhichWoof] = useState(0);
  const { toggle: woof1 } = useAudio("/pochita1.mp3"); 
  const { toggle: woof2 } = useAudio("/pochita2.mp3");

  return (
    <header className='sticky top-0 bg-gray-800 flex justify-between items-center p-2 z-10 md:px-16 md:py-4'>
      <button
        onClick={() => {
          if (whichWoof === 0) {
            woof1();
            setWhichWoof(1);
          } else if (whichWoof === 1) {
            woof2();
            setWhichWoof(0);
          }
        }}
        className='cursor-pointer rounded-full bg-cover bg-center w-8 h-8 hover:animate-spin md:w-16 md:h-16'
        style={{
          backgroundImage: 'url(/sq_pochita.jpg)'
        }}
      />
      <div className='flex font-bold space-x-2 z-10'>
        <ActiveLink
          text="current"
          href={index}
          isActive={router.asPath === index}
        />
        <ActiveLink
          text="episodes"
          href={episodes}
          isActive={router.asPath === episodes}
        />
      </div>
    </header>
  )
}

export default Header
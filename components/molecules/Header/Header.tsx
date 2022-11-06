import { useRouter } from 'next/router'
import { useState, useMemo } from 'react';

import useAudio from '../../../hooks/useAudio'

import ActiveLink from './ActiveLink'

const index = "/"
const episodes = "/episodes"
const about = "/about"

const woofSoundArr = [
  "/pochita1.mp3",
  "/pochita2.mp3",
  "/denji1.mp3",
]

const Header = () => {
  const router = useRouter()

  const [whichWoof, setWhichWoof] = useState(0);
  const { toggle: woof1 } = useAudio(woofSoundArr[0]); 
  const { toggle: woof2 } = useAudio(woofSoundArr[1]);
  const { toggle: woof3 } = useAudio(woofSoundArr[2]);

  const woofs = useMemo(() => [woof1, woof2, woof3], [woof1, woof2, woof3]);

  return (
    <div className='sticky top-0 bg-gray-800 flex flex-col items-center z-10'>
      <div className='w-full flex justify-between items-center p-2 md:max-w-256 md:p-4 '>
        <button
          onClick={() => {
            woofs[whichWoof]();
            setWhichWoof((prevWoof) => {
              if (prevWoof === woofs.length - 1) return 0;
              return prevWoof + 1;
            })
          }}
          className='cursor-pointer flex rounded-full bg-cover bg-center w-8 h-8 hover:animate-spin md:w-16 md:h-16'
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
            isActive={router.asPath.includes(episodes)}
          />
          <ActiveLink
            text="about"
            href={about}
            isActive={router.asPath === about}
          />
        </div>
      </div>
    </div>
  )
}

export default Header

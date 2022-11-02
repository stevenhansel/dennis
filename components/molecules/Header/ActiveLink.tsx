import { motion } from 'framer-motion';
import Link from 'next/link'
import clsx from 'clsx'

type Props = {
  text: string
  href: string
  isActive: boolean
}

const variants = {
  in: {
    background: ['#1f2937', '#000000'],
    color: ['#374151', '#ffffff'],
  },
  out: {
    background: ['#000000', '#1f2937'],
    color: ['#ffffff', '#374151'],
  },
}

const ActiveLink = (props: Props) => {
  const {
    text,
    href,
    isActive,
  } = props

  return (
    <motion.div
      layout
      animate={isActive ? "in" : "out"}
      variants={variants}
      transition={{ duration: 0.5, type: "tween" }}
      className={'rounded-full shadow-md px-2 py-1'}
    >
      <Link href={href}>
        {text}
      </Link>
    </motion.div>
  )
}

export default ActiveLink;
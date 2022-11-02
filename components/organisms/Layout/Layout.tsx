import { Header } from '../../molecules'

type Props = {
  children: React.ReactNode
}

const Layout = (props: Props) => {
  const { children } = props
  return (
    <>
      <Header />
      <main className="bg-gray-800 h-max-screen min-h-screen">{children}</main>
    </>
  )
}

export default Layout
import {
  Link,
  Navbar as NUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { useLocation } from 'react-router-dom'

import { Image } from '~/components/Image'

export const Navbar = () => {
  const location = useLocation()

  return (
    <NUINavbar isBordered>
      <NavbarBrand>
        <Image
          className="h-14 w-14 mx-4 self-center"
          src="/public/logo-rec.png"
          alt="Recife, Pernambuco logotipo"
        />
        <p className="font-bold text-inherit">PITANG COVID</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={location.pathname === '/schedules/register'}>
          <Link color="primary" href="/schedules/register">
            Agendar
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/schedules'}>
          <Link href="/schedules" aria-current="page">
            Listagem
          </Link>
        </NavbarItem>
      </NavbarContent>
    </NUINavbar>
  )
}

import logo from '../../../public/assets/logo.svg';
/*
import ConnectWallet from 'components/ConnectWallet/ConnectWallet'
import { routes } from 'pages/Router'
 */

//import type { RouteConfig } from 'pages/Router'
import Image from "next/image";
import Link from "next/link";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";

/*
function NavLink({ route }: NavLinkProps) {
  const location = useLocation()
  const isSelected = location.pathname === route.path

  return (
    <Link
      className={classnames('mr-12 font-semibold', {
        'text-gumdrop-500': isSelected,
        'text-licorice-200 hover:text-gumdrop-200 focus:text-gumdrop-200':
          !isSelected,
      })}
      to={'/'}
    >
      {route.label}
    </Link>
  )
}

 */
/*
{routes
  .filter((route) => route.nav)
  .map((route) => (
    <NavLink key={route.path} route={route} />
  ))}
*/

function Nav() {
  return (
    <nav className="flex w-full flex-row items-center p-6">
        <Image className="inline h-12" src={logo} alt="logo" />
        <span className="ml-4 text-2xl font-semibold text-white">
          Cross-Chain Transfer Protocol
        </span>


      <div className="ml-auto">
        <ConnectWallet />
      </div>
    </nav>
  )
}

export default Nav

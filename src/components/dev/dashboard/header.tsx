import InfoMenu from "@/components/info-menu"
import Logo from "@/components/logo"
import NotificationMenu from "@/components/notification-menu"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import UserMenu from "@/components/user-menu"
import { User } from "lucide-react"
import { useLocation } from '@tanstack/react-router'

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: '/dashboard/dev', label: 'Overview', match: '/dashboard/dev' },
  { href: '/dashboard/dev/projects', label: 'Projects', match: '/dashboard/dev/projects' },
  { href: '/dashboard/dev/organizations', label: 'Organizations', match: '/dashboard/dev/organizations' },
  { href: '/dashboard/dev/users', label: 'Users', match: '/dashboard/dev/users' },
  { href: '/dashboard/dev/settings', label: 'Settings', match: '/dashboard/dev/settings' },
]

interface HeaderProps {
  onNavigate: (section: string) => void
  currentSection: string
}

export default function Header({ onNavigate, currentSection }: HeaderProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (href: string) => {
    if (href === '/dashboard/dev') {
      return pathname === '/dashboard/dev' || pathname === '/dashboard/dev/';
    }
    return pathname === href;
  };

  return (
    <header className="border-b py-4 border-neutral-800 bg-neutral-900 px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden hover:bg-neutral-900"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none text-neutral-400"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden bg-black border-neutral-800">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        href={link.href}
                        data-active={isActive(link.href)}
                        className={`py-1.5 ${isActive(link.href) ? 'text-violet-400' : 'text-neutral-400 hover:text-neutral-200'}`}
                        onClick={(e) => {
                          e.preventDefault()
                          onNavigate(link.label)
                        }}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-end divide-x-2 divide-neutral-800">
            <a href="#" className="text-neutral-200 hover:text-white transition-colors pr-8">
              <Logo />
            </a>
            <div className="flex items-center gap-2 pl-4">
              <User size={16} className="text-neutral-400" />
              <span className="text-md font-medium">Igor Gomes</span>
            </div>

          </div>

        </div>
        {/* Right side */}
        <div className="flex items-center gap-4 ">
          <div className="flex items-center gap-2">
            {/* Info menu */}
            <InfoMenu />
            {/* Notification */}
            <NotificationMenu />
          </div>
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
      <NavigationMenu className="max-md:hidden mt-4">
        <NavigationMenuList className="gap-4">
          {navigationLinks.map((link, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuLink
                href={link.href}
                data-active={isActive(link.href)}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(link.label)
                }}
              >
                {link.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

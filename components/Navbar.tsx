'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// Inline SVG icon components (replaces lucide-react)
const ShoppingCart = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
  </svg>
)
const UserIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
const MenuIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
)
const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
)
import { cn } from '@/lib/utils'

type DropdownItem = {
  label: string
  href: string
}

type NavItem = {
  label: string
  href?: string
  dropdown?: DropdownItem[]
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    dropdown: [
      { label: 'Company', href: '/company/' },
      { label: "Our MD's Message", href: '/mds-message/' },
      { label: 'Partner With Us', href: '/partner-with-us/' },
    ],
  },
  {
    label: 'Programs',
    dropdown: [
      { label: 'Home (Abacus)', href: '/' },
      { label: 'Vedic Math', href: '/vedic-math/' },
      { label: 'Mind Dart', href: '/mind-dart/' },
      { label: 'Hand Writing', href: '/hand-writing/' },
      { label: 'Short Courses', href: '/short-courses/' },
      { label: 'Online Learning Portal', href: '/online-learning-portal/' },
    ],
  },
  {
    label: 'Competition',
    dropdown: [
      { label: 'Offline Competition', href: '/offline-competition/' },
      { label: 'Online Competition', href: '/online-competition/' },
      { label: 'Portal Login', href: '/portal-login/' },
    ],
  },
  {
    label: 'Shop',
    dropdown: [
      { label: 'Books', href: '#' },
      { label: 'Franchisee books', href: '/product-category/franchisee-books/' },
      { label: 'School books', href: '/product-category/school-books/' },
      { label: 'Vedic maths', href: '/product-category/vedic-maths/' },
      { label: 'Speed writing', href: '/product-category/speed-writing/' },
      { label: 'Hand writting', href: '/product-category/hand-writting/' },
      { label: 'Flash cards', href: '/product-category/flash-cards/' },
      { label: 'Abacus tool', href: '/product-category/abacus-tool/' },
      { label: 'Bag', href: '/product-category/bag/' },
      { label: 'T shirt', href: '/product-category/t-shirt/' },
    ],
  },
  { label: 'Contact us', href: '/contact-us/' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label))
  }

  return (
    <header
      className={cn(
        'z-50 w-full transition-all duration-300',
        scrolled
          ? 'sticky top-0 bg-white shadow-md'
          : 'relative bg-white'
      )}
    >
      <div className="mx-auto max-w-[1200px] px-4">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-300',
            scrolled ? 'h-[70px]' : 'h-[107px]'
          )}
        >
          {/* Branding */}
          <div className="branding flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Learning made easy"
                width={158}
                height={54}
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex">
            <ul className="m-0 flex list-none p-0">
              {navItems.map((item) => (
                <li key={item.label} className="group relative">
                  {item.href && !item.dropdown ? (
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-4 py-[29px] font-["Plus_Jakarta_Sans",sans-serif] text-[12.5px] font-normal leading-none transition-colors duration-200',
                        pathname === item.href
                          ? 'text-[#ff6600]'
                          : 'text-[#333333] hover:text-[#ff6600]'
                      )}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={cn(
                          'block cursor-pointer border-0 bg-transparent px-4 py-[29px] font-["Plus_Jakarta_Sans",sans-serif] text-[12.5px] font-normal leading-none transition-colors duration-200',
                          'text-[#333333] hover:text-[#ff6600] group-hover:text-[#ff6600]'
                        )}
                      >
                        {item.label}
                      </button>
                      {item.dropdown && (
                        <ul
                          className={cn(
                            'invisible absolute left-0 top-full z-[100] m-0 list-none p-2 opacity-0 transition-all duration-200',
                            'min-w-[200px] rounded-[4px] bg-white shadow-[0_5px_15px_rgba(0,0,0,0.1)]',
                            'group-hover:visible group-hover:opacity-100'
                          )}
                        >
                          {item.dropdown.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                className={cn(
                                  'block px-4 py-2 text-[13px] text-[#333333] no-underline transition-colors duration-150',
                                  'hover:bg-[#f5f7fa] hover:text-[#ff6600]'
                                )}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              href="/cart/"
              className="relative text-gray-700 transition-colors hover:text-[#ff6600]"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-semibold text-white">
                0
              </span>
            </Link>

            {/* Account */}
            <Link
              href="/account/"
              className="text-gray-700 transition-colors hover:text-[#ff6600]"
              aria-label="My account"
            >
              <UserIcon size={20} />
            </Link>

            {/* CTA Button */}
            <Link
              href="/check-speed/"
              className={cn(
                'hidden whitespace-nowrap rounded-[5px] bg-[#ff6600] px-5 py-3 text-sm font-semibold text-white no-underline transition-opacity duration-200 hover:opacity-90 md:inline-block'
              )}
            >
              Check Your Abacus Speed
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              className="flex flex-col items-center justify-center gap-1 text-gray-700 md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="w-full border-t border-gray-100 bg-white shadow-md md:hidden">
          <ul className="m-0 list-none p-0">
            {navItems.map((item) => (
              <li key={item.label} className="border-b border-gray-100 last:border-b-0">
                {item.href && !item.dropdown ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-4 py-3 text-sm font-medium transition-colors duration-150',
                      pathname === item.href
                        ? 'text-[#ff6600]'
                        : 'text-[#333333] hover:text-[#ff6600]'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      className={cn(
                        'flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-150',
                        openDropdown === item.label
                          ? 'text-[#ff6600]'
                          : 'text-[#333333] hover:text-[#ff6600]'
                      )}
                      onClick={() => toggleMobileDropdown(item.label)}
                    >
                      {item.label}
                      <span className="ml-2 text-xs">
                        {openDropdown === item.label ? '▲' : '▼'}
                      </span>
                    </button>
                    {openDropdown === item.label && item.dropdown && (
                      <ul className="m-0 list-none bg-[#f5f7fa] p-0">
                        {item.dropdown.map((sub) => (
                          <li key={sub.label} className="border-t border-gray-100">
                            <Link
                              href={sub.href}
                              className="block px-8 py-2.5 text-[13px] text-[#333333] no-underline transition-colors duration-150 hover:text-[#ff6600]"
                              onClick={() => {
                                setMobileOpen(false)
                                setOpenDropdown(null)
                              }}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
            {/* Mobile CTA */}
            <li className="p-4">
              <Link
                href="/check-speed/"
                className="block w-full rounded-[5px] bg-[#ff6600] px-5 py-3 text-center text-sm font-semibold text-white no-underline transition-opacity duration-200 hover:opacity-90"
                onClick={() => setMobileOpen(false)}
              >
                Check Your Abacus Speed
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

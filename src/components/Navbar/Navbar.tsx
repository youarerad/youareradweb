import NavLink from './NavLinks'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'
import PrimaryButton from '@components/PrimaryButton'
import classNames from '@utils/classNames'
import Image from 'next/image'
import { corePages, fundraisePages, mobileNav, supportPages } from '@data/PageLinks'

/* Navbar mainly uses the Popover headless component to handle both the main and mobile navigation. Additional support is needed here to explore best practices for acessibility, especially in regards to nav nesting.*/

export default function Navbar() {
  return (
    <Popover as="nav" className="z-50 mx-auto py-4">
      {({ open, close }) => (
        <>
          <nav
            className="relative flex items-center justify-between mx-auto md:justify-start md:space-x-10"
            aria-label="Main menu"
          >
            <Link href="/" passHref className="flex w-2/5">
              <a className="inline-flex items-center outline-none focus:ring-4 focus:ring-secondary-light rounded-xl">
                <Image
                  width={48}
                  height={48}
                  src="/rad.svg"
                  alt="Rise Above The Disorders logomark. A brain with a heart in the center."
                />
                <p className="text-3xl font-medium cursor-pointer">RAD</p>
              </a>
            </Link>
            <Popover.Button
              className="md:hidden inline-flex items-center justify-center p-2 bg-white rounded-md"
              id="mobileMenu"
              as="button"
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Popover.Button>
            <Popover.Group
              className="hidden items-baseline justify-end w-4/5 space-x-4 md:flex"
              as="nav"
              role="navigation"
              aria-label="Secondary menu"
            >
              {corePages.map((corepage) => (
                <NavLink href={corepage.href} key={corepage.name}>
                  {corepage.name}
                </NavLink>
              ))}
              <Popover>
                {({ open }) => (
                  <>
                    <Popover.Button
                      className="flex flex-wrap items-center p-2 text-sm font-bold group overflow-hidden rounded-xl focus:ring-4 focus:ring-secondary-light hover:bg-black hover:text-white focus-within:text-white focus-within:bg-black outline-none"
                      role="navigation"
                      aria-label="Open menu to learn more about getting involved."
                    >
                      <span>Get Involved</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={classNames(open ? 'rotate-180' : '', 'h5 w-5')}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      <div className="bg-rad ease-linear bottom-0 left-0 h-0.5 w-full origin-bottom-right scale-x-0 transition-transform duration-300 group-hover:origin-bottom-left group-hover:scale-x-100 group-focus:scale-x-100 group-focus:origin-bottom-left" />
                    </Popover.Button>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition-transform ease-in duration-200"
                      enterFrom="opacity-0 -translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-1"
                    >
                      <Popover.Panel
                        className="absolute inset-x-0 z-10 hidden transform bg-white shadow-lg top-full rounded-xl md:block"
                        static
                      >
                        <div className="absolute inset-0 flex">
                          <div className="w-1/2" />
                          <div className="w-1/2 bg-secondary-light/10" />
                        </div>
                        <div className="relative grid grid-cols-2 mx-auto">
                          <nav className="py-12 px-6 lg:px-8 xl:pr-12 grid grid-cols-2">
                            <h3>Supporting RAD</h3>
                            <ul className="space-y-6 mt-5 col-start-1">
                              {supportPages.map((supportpage) => (
                                <li key={supportpage.name} className="flow-root">
                                  <Link href={supportpage.href} passHref>
                                    <a className="flex items-center p-3 -m-3 text-base font-medium rounded-md hover:bg-secondary-light/10 focus:bg-secondary-light/10 focus:ring-4 focus:ring-secondary-light outline-none">
                                      <Image
                                        src={supportpage.icon}
                                        className="flex-shrink-0 w-6 h-6"
                                        width={24}
                                        height={24}
                                        aria-hidden="true"
                                        alt={supportpage.name}
                                      />
                                      <span className="ml-4">{supportpage.name}</span>
                                    </a>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </nav>
                          <div className="py-12 px-6 lg:px-8 xl:pr-12">
                            <h3>RAD Community</h3>
                            <ul className="mt-5 space-y-6">
                              {fundraisePages.map((fundraisepage) => (
                                <li key={fundraisepage.name} className="flow-root">
                                  <Link href={fundraisepage.href} passHref>
                                    <a className="flex p-3 -m-3 rounded-md hover:bg-white focus:bg-white focus:ring-4 focus:ring-secondary-light outline-none">
                                      <Image
                                        width={200}
                                        height={100}
                                        objectFit="cover"
                                        className="rounded-md flex-shrink-0"
                                        src={fundraisepage.image}
                                        alt=""
                                      />
                                      <div className="flex-1 w-0 ml-8">
                                        <h4 className="text-base font-medium">
                                          {fundraisepage.name}
                                        </h4>
                                        <p>{fundraisepage.context}</p>
                                      </div>
                                    </a>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </Popover.Group>
          </nav>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-in duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              className="fixed inset-x-0 top-0 z-50 items-baseline h-screen px-4 pt-5 mx-auto transition origin-top-right transform bg-black md:hidden"
              focus
              static
            >
              <div className="flex justify-between">
                <div className="flex w-2/5">
                  <Link href="/" passHref>
                    <a className="inline-flex items-center rounded-md">
                      <Image
                        width={48}
                        height={48}
                        src="/rad.svg"
                        alt="Rise Above The Disorder logomark. A brain with a heart in the center."
                      />
                      <p className="text-3xl font-medium text-white cursor-pointer">RAD</p>
                    </a>
                  </Link>
                </div>
                <Popover.Button className="inline-flex items-center justify-center p-2 bg-white rounded-md focus:bg-red-light outline-none focus:ring-4 focus:ring-inset">
                  <span className="sr-only">Close mobile menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Popover.Button>
              </div>
              <div className="p-4 flex flex-col h-full space-y-10 mt-20">
                <div className="text-white">
                  {mobileNav.map((corepages) => {
                    return (
                      <NavLink
                        href={corepages.href}
                        key={corepages.name}
                        onClick={() => close()}
                        subItem
                      >
                        {corepages.name}
                      </NavLink>
                    )
                  })}
                </div>
                <div>
                  <Link href="/donate" passHref>
                    <div>
                      <PrimaryButton
                        onClick={() => close()}
                        buttonText="Donate Therapy"
                        type="button"
                        as="a"
                      />
                    </div>
                  </Link>
                </div>
                <Link href="/therapy" passHref>
                  <div className="rounded-xl">
                    <button className="relative px-3 py-2 text-base font-bold bg-white rounded-xl border-2 border-black w-full">
                      Start Therapy
                    </button>
                  </div>
                </Link>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

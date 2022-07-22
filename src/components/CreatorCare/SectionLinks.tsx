import classNames from '@utils/classNames'
import Link from 'next/link'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
interface activeLinkProps {
	href: string
	label: string
	state: Dispatch<SetStateAction<string>>
}

export default function SectionLinks({ state, href, label }: activeLinkProps) {
	const [activeLink, setActiveLink] = useState('')

	useEffect(() => {
		state(activeLink)
	})
	useEffect(() => {
		window.addEventListener('scroll', function () {
			const observable = {
				about: document.querySelector('#about'),
				join: document.querySelector('#join'),
				bot: document.querySelector('#bot'),
				transparency: document.querySelector('#transparency'),
				faq: document.querySelector('#faq'),
			}

			const pos = {
				about: observable.about?.getBoundingClientRect(),
				join: observable.join?.getBoundingClientRect(),
				bot: observable.bot?.getBoundingClientRect(),
				transparency: observable.transparency?.getBoundingClientRect(),
				faq: observable.faq?.getBoundingClientRect(),
			}

			if (pos.about!.top < window.innerHeight && pos.about!.bottom >= 0) {
				setActiveLink('about')
			} else if (pos.join!.top < window.innerHeight && pos.join!.bottom >= 0) {
				setActiveLink('join')
			} else if (pos.bot!.top < window.innerHeight && pos.bot!.bottom >= 0) {
				setActiveLink('bot')
			} else if (pos.transparency!.top < window.innerHeight && pos.transparency!.bottom >= 0) {
				setActiveLink('transparency')
			} else if (pos.faq!.top < window.innerHeight && pos.faq!.bottom >= 0) {
				setActiveLink('faq')
			}
		})

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		return () => {}
	}, [])

	return (
		<Link href={'#' + href} passHref>
			<a
				href={'#' + href}
				className={`${
					activeLink === href ? '' : 'text-gray hover:text-primary'
				} group relative font-bold`}
			>
				{label}
				<span>
					<div
						className={classNames(
							activeLink === href ? 'scale-x-100 origin-bottom-left' : 'scale-x-0 ',
							'bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ease-linear bg-primary motion-reduce:transition-none group-hover:scale-x-100 motion-reduce:hover:transform-none origin-bottom-left'
						)}
					/>
				</span>
			</a>
		</Link>
	)
}

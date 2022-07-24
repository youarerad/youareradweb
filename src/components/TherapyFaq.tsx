import { Disclosure, Transition } from '@headlessui/react'
import classNames from '@utils/classNames'

export default function TherapyFAQ() {
	return (
		<div className="w-full space-y-4">
			{therapyFaqData.map((faq) => (
				<Disclosure key={faq.question}>
					{({ open }) => (
						<>
							<Disclosure.Button
								className={classNames(
									open
										? 'bg-primary-light text-white'
										: 'hover:bg-secondary-light focus:bg-secondary-light',
									'relative inline-flex items-center w-full px-3 py-2 text-2xl font-bold text-left transition-all duration-300 ease-linear  focus:text-white hover:shadow-none focus-within:shadow-none hover:text-white rounded-xl'
								)}
							>
								<span>{faq.question}</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className={classNames(
										open ? 'rotate-180' : '',
										'w-5 h-5 ml-2 transition-transform duration-300'
									)}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
								</svg>
							</Disclosure.Button>
							<Transition
								show={open}
								enter="transition duration-300 ease-out"
								enterFrom="transform opacity-0"
								enterTo="transform opacity-300"
								leave="transition duration-35 ease-out"
								leaveFrom="transform opacity-300"
								leaveTo="transform opacity-0"
							>
								<Disclosure.Panel key={faq.question} className="px-4 pt-2 pb-4 text-base">
									{faq.answer}
								</Disclosure.Panel>
							</Transition>
						</>
					)}
				</Disclosure>
			))}
		</div>
	)
}

const therapyFaqData = [
	{
		value: '1',
		question: 'Who can apply?',
		answer:
			'Our programs are open to all people, of all ages, across all nations. For those presently unable to afford mental health care, we will work with you to verify financial hardship and use donations to cover the cost of mental health care.',
	},
	{
		value: '2',
		question: 'How much is therapy?',
		answer:
			"For those looking at our therapist finder, you'll want to budget at least $50 per week. Anyone unable to afford $50 per week will instead have the cost covered by RAD. For reference, the average cost of therapy is $120 a session, with most people going to therapy once per week.",
	},
	{
		value: '3',
		question: 'Does RAD cover residential treatment?',
		answer:
			"We don't presently offer coverage for residential treatment. Our team is working towards covering residential treatment in the future.",
	},
	{
		value: '4',
		question: 'How many sessions will RAD cover?',
		answer:
			"There is no limit to therapy sessions we will cover. Our social workers will help to establish goals for therapy and stay with you until you're in a place where you can comfortable take over payment. For reference, the average time spent in our program is 6 months. 26 therapy sessions.",
	},
	{
		value: '5',
		question: 'What does RAD cover?',
		answer:
			'Our team covers any approach to therapy that is backed by empirical evidence; including most commonly practiced forms of psychotherapy. RAD also covers medication, including general psychopharmaceuticals and psychedelic medicine *where legal and under the guidance of qualified professionals.',
	},
	{
		value: '6',
		question: 'What may not be covered?',
		answer:
			'At present, those experiencing houselessness, seeking court mandated care, or court evaluations will be referred to organizations better equipped for such.',
	},
]

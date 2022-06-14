import classNames from '@utils/classNames'

interface PageHeaderProps {
  headerText: string
  headerTextCont?: string
  headerTextHighlight: string
  variant: 'corePage' | 'supportPage'
}

export default function PageHeader({
  headerText,
  headerTextCont,
  headerTextHighlight,
  variant,
}: PageHeaderProps) {
  return (
    <section className="mt-10">
      <header>
        <h1 className="text-center">
          {headerText}
          {headerTextCont && <span className="block">{headerTextCont}</span>}{' '}
          <span
            className={classNames(
              variant === 'corePage' ? 'to-secondary-light from-primary-light' : '',
              variant === 'supportPage' ? 'to-secondary from-green' : '',
              'text-transparent sm:whitespace-nowrap bg-gradient-to-r bg-clip-text'
            )}
          >
            {headerTextHighlight}
          </span>
        </h1>
      </header>
    </section>
  )
}

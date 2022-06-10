import StyledLink from './StyledLink'

interface HeaderSectionProps {
  headerSubText: string
  headerSubTextColor: string
  headerText: string
  headerTextCentered?: boolean
  headerTextHighlight: string
  headerTextHighlightColor: string
  children?: React.ReactNode
  link?: string
  linkText?: string
}

export default function HeaderSection({
  headerSubText,
  headerSubTextColor,
  headerTextCentered,
  headerText,
  headerTextHighlight,
  headerTextHighlightColor,
  children,
  link,
  linkText,
}: HeaderSectionProps) {
  return (
    <header className={`space-y-0 ${headerTextCentered && 'text-center'}`}>
      <h2>
        <span className={`block text-base ${headerSubTextColor} text-extrabold`}>
          {headerSubText}
        </span>
        {headerText}
        <span
          className={`block text-transparent bg-gradient-to-r ${headerTextHighlightColor} bg-clip-text`}
        >
          {headerTextHighlight}
        </span>
      </h2>
      <p className="max-w-screen-sm pt-2 pb-4 font-semibold text-gray-dark">{children}</p>
      {link && <StyledLink href={link}>{linkText}</StyledLink>}
    </header>
  )
}

import Link from 'next/link'

export default function Custom500() {
  return (
    <section>
      <h1>500</h1>
      <p>
        <Link href="/">
          <a>Go to home page</a>
        </Link>
      </p>
    </section>
  )
}

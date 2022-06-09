import Link from 'next/link'

export default function Custom400() {
  return (
    <section>
      <h1>404</h1>
      <p>
        <Link href="/">
          <a>Go to home page</a>
        </Link>
      </p>
    </section>
  )
}

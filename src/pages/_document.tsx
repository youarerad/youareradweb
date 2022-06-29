import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link href="/favicons/favicon.ico" rel="shortcut icon" />
				<link href="/favicons/manifest.json" rel="manifest" />
				<link href="/favicons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
				<link href="/favicons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
				<link href="/favicons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />

				<meta content="#F6F6F6" name="theme-color" />

				<meta content="#ffffff" name="msapplication-TileColor" />
				<meta charSet="utf-8" />
				<meta content="/favicons/browserconfig.xml" name="msapplication-config" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<meta
					name="google-site-verification"
					content="xPLkKTIljMR4bmcRMMLsz-jlWSy1p2d1sinVriW0XKY"
				/>
			</Head>
			<body className="antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

import { META } from "config";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en-us">
				<Head>
					<meta name="description" content={META.description} />
					<meta name="author" content="https://webdefy.tech" />
					<meta name="keywords" content={META.tags.join(",")} />

					<meta itemProp="name" content={META.title} />
					<meta itemProp="description" content={META.description} />
					<meta itemProp="image" content={META.image} />

					<meta property="og:url" content={META.url} />
					<meta property="og:type" content="website" />
					<meta property="og:title" content={META.title} />
					<meta
						property="og:description"
						content={META.description}
					/>
					<meta property="og:image" content={META.image} />

					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:title" content={META.title} />
					<meta
						name="twitter:description"
						content={META.description}
					/>
					<meta name="twitter:image" content={META.image} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

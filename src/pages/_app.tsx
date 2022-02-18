import { ChakraProvider, Flex, Stack } from "@chakra-ui/react";
import Footer from "@components/footer";
import Header from "@components/header";
import theme from "@styles/theme";
import { META } from "config";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>{META.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ChakraProvider theme={theme}>
				<Stack direction="column" h="100vh">
					<Header />

					<Flex flex={1} overflowY="auto">
						<Component {...pageProps} />
					</Flex>

					<Footer />
				</Stack>
			</ChakraProvider>
		</>
	);
}

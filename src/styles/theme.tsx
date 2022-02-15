import { extendTheme } from "@chakra-ui/react";
import Link from "./components/Link";

const theme = extendTheme({
	colors: {
		primary: "#CCE6F4",
	},
	components: {
		Link,
	},
	styles: {
		global: () => ({
			html: {
				height: "100%",
			},
			body: {
				fontFamily:
					"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
				color: "black",
				lineHeight: "base",
				padding: 0,
				margin: 0,
				backgroundColor: "primary",
			},
			a: {
				color: "inherit",
				textDecoration: "none",
			},
			ul: {
				listStyle: "none",
			},
			"&::-webkit-scrollbar": {
				width: "0.6em",
			},
			"&::-webkit-scrollbar-track": {
				borderRadius: "0px",
				background: "transparent",
			},
			"&::-webkit-scrollbar-thumb": {
				background: "#adc4cf",
				borderRadius: "50px",
			},
		}),
	},
});

export default theme;

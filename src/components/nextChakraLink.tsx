/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";

export default function NextChakraLink({ children, ...props }: LinkProps) {
	return (
		<NextLink href={props.href} passHref>
			<Link
				{...props}
				_active={{ boxShadow: "none" }}
				_focus={{ boxShadow: "none" }}
				_hover={{ textDecoration: "none" }}
			>
				{children}
			</Link>
		</NextLink>
	);
}

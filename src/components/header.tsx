import { Heading, HStack, Spacer } from "@chakra-ui/react";

export default function Main() {
	return (
		<HStack
			bg="secondary"
			px={16}
			py={2.5}
			as="header"
			boxShadow="0 30px 60px #adc4cf"
		>
			<Heading size="lg">Today</Heading>
			<Spacer />
			<Heading size="lg">Personal Scheduler</Heading>
		</HStack>
	);
}

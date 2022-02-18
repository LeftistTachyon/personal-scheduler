import { Heading, HStack, Spacer } from "@chakra-ui/react";

export default function Main() {
	return (
		<HStack
			bg="secondary"
			px={16}
			py={2.5}
			as="header"
			boxShadow="0 5px 10px #adc4cf"
			position="sticky"
			top={0}
			h="7vh"
			background="primary"
			zIndex={1}
		>
			<Heading size="lg">Today</Heading>
			<Spacer />
			<Heading size="lg">Personal Scheduler</Heading>
		</HStack>
	);
}

import {
	Box,
	SimpleGrid,
	Stack,
	StackProps,
	Text,
	VStack,
} from "@chakra-ui/react";

export default function Home() {
	return (
		<Stack
			spacing={10}
			justifySelf="stretch"
			align="stretch"
			minW="100vw"
			p={10}
			direction="row"
		>
			<GridItem>
				<Text>&lt;</Text>
			</GridItem>
			<GridItem flex={1}></GridItem>
			<VStack flex={2} align="stretch" spacing={10}>
				<Box flex={1}>
					<SimpleGrid columns={2} spacing={10}>
						<GridItem></GridItem>
						<GridItem></GridItem>
					</SimpleGrid>
				</Box>
				<GridItem>
					<Text>Create</Text>
				</GridItem>
				<GridItem>
					<Text>Credits</Text>
				</GridItem>
			</VStack>
			<GridItem>
				<Text>&gt;</Text>
			</GridItem>
		</Stack>
	);
}

function GridItem({ children, ...props }: StackProps): JSX.Element {
	return (
		<VStack
			rounded={30}
			background="primary"
			boxShadow="15px 15px 30px #adc4cf, -15px -15px 30px #ebffff"
			padding={2.5}
			direction="column"
			justify="center"
			{...props}
		>
			{children}
		</VStack>
	);
}

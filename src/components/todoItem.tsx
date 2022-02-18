import {
	BoxProps,
	Center,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Icon,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Stack,
	StackProps,
	Text,
	Textarea,
	useBoolean,
	VStack,
} from "@chakra-ui/react";
import { Duration } from "luxon";
import { ChangeEvent, useLayoutEffect, useRef, useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TodoItemData } from "types";

type TodoItemProps = StackProps & { data: TodoItemData };

function TodoItem({
	data: { title: defaultTitle, description: defaultDescription, duration },
	...props
}: TodoItemProps): JSX.Element {
	const [editing, setEditing] = useBoolean();
	const [title, setTitle] = useState(defaultTitle);
	const [description, setDescription] = useState(defaultDescription);
	const [minutes, setMinutes] = useState(duration.as("minutes"));
	const textRef = useRef<HTMLTextAreaElement>();

	// useEffect(() => {
	// 	if (editing) {
	// 		console.log("Editing", duration.as("hours"));
	// 		setMinutes(duration.as("minutes"));
	// 	} else {
	// 		console.log("Not editing");
	// 	}
	// }, [editing]);

	useLayoutEffect(() => {
		if (editing) {
			textRef.current.style.height = "auto";
			textRef.current.style.height = textRef.current.scrollHeight + "px";
		}
	}, [editing]);

	function updateTextareaHeight(e: ChangeEvent<HTMLTextAreaElement>) {
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
	}

	return (
		<VStack
			p={5}
			rounded={30}
			bg="primary"
			boxShadow="10px 10px 20px #adc4cf, -10px -10px 20px #ebffff"
			overflow="hidden"
			align="stretch"
			{...props}
		>
			{editing ? (
				<FormControl>
					<Heading size="md">
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							fontWeight="inherit"
							fontSize="inherit"
							variant="flushed"
						/>
					</Heading>
					<HStack>
						<NumberInput
							defaultValue={0}
							min={0}
							value={minutes}
							variant="flushed"
							onChange={(str) => {
								if (str?.length) setMinutes(Number(str));
							}}
						>
							<NumberInputField id="minutes" />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<FormLabel htmlFor="minutes">
							<Text as="i" fontWeight="normal">
								minutes
							</Text>
						</FormLabel>
					</HStack>
					<Text>
						<Textarea
							value={description}
							onInput={updateTextareaHeight}
							onChange={(e) => setDescription(e.target.value)}
							variant="flushed"
							lineHeight="inherit"
							resize="none"
							overflow="hidden"
							ref={textRef}
						/>
					</Text>
				</FormControl>
			) : (
				<Stack maxW="100%" py={2}>
					<Heading size="md">{title}</Heading>
					<Text as="i">
						{Duration.fromObject({
							hours: Math.floor(minutes / 60),
							minutes: minutes % 60 ?? null,
						}).toHuman()}
					</Text>
					<Text>{description}</Text>
				</Stack>
			)}
			<Stack direction="row" justify="center">
				<InsetButton onClick={setEditing.toggle}>
					<Icon as={editing ? FaCheck : FaEdit} boxSize={4} />
				</InsetButton>
				<InsetButton>
					<Icon as={MdDelete} boxSize={4} />
				</InsetButton>
			</Stack>
		</VStack>
	);
}

function InsetButton(props: BoxProps): JSX.Element {
	return (
		<Center
			rounded={30}
			bg="primary"
			boxShadow="inset 2px 2px 4px #adc4cf, inset -2px -2px 4px #ebffff"
			padding={2.5}
			as="button"
			{...props}
		/>
	);
}

export default TodoItem;

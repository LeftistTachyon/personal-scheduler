import {
	BoxProps,
	Center,
	FormControl,
	FormErrorMessage,
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

type TodoItemProps = StackProps & {
	data: TodoItemData;
	onDelete: () => void;
	onSave: (a: TodoItemData) => boolean;
};

function TodoItem({
	data: {
		title: defaultTitle,
		description: defaultDescription,
		duration: defaultDuration,
	},
	onDelete,
	onSave,
	...props
}: TodoItemProps): JSX.Element {
	const [editing, setEditing] = useBoolean();
	const [isUnique, setUnique] = useBoolean(true);
	const [title, setTitle] = useState(defaultTitle);
	const [description, setDescription] = useState(defaultDescription);
	const [duration, setDuration] = useState(defaultDuration);
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

	// useEffect(() => {
	// 	if (!editing) {

	// 	}
	// }, [editing]);

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
				<FormControl flex={1} isInvalid={!isUnique}>
					<Heading size="md">
						<Input
							value={title}
							onChange={(e) => {
								setUnique.on();
								setTitle(e.target.value);
							}}
							placeholder="Title"
							fontWeight="inherit"
							fontSize="inherit"
							variant="flushed"
						/>
					</Heading>
					<HStack>
						<NumberInput
							defaultValue={0}
							min={0}
							value={duration}
							variant="flushed"
							onChange={(_, num) => {
								if (!isNaN(num)) {
									setUnique.on();
									setDuration(num);
								}
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
							onChange={(e) => {
								setUnique.on();
								setDescription(e.target.value);
							}}
							placeholder="Description"
							variant="flushed"
							lineHeight="inherit"
							resize="none"
							overflow="hidden"
							ref={textRef}
						/>
					</Text>
					{isUnique ? null : (
						<FormErrorMessage>
							You already have an event with this data! Please
							change something or delete this event.
						</FormErrorMessage>
					)}
				</FormControl>
			) : (
				<Stack maxW="100%" flex={1} py={2}>
					<Heading size="md">{title}</Heading>
					<Text as="i">
						{Duration.fromObject({
							hours: Math.floor(duration / 60),
							minutes: duration % 60 ?? null,
						}).toHuman()}
					</Text>
					<Text>{description}</Text>
				</Stack>
			)}
			<Stack direction="row" justify="center">
				{editing ? (
					<InsetButton
						onClick={() => {
							// console.log("Saving...");
							if (
								onSave({
									title,
									description,
									duration,
									isFixed: false,
								})
							) {
								setUnique.on();
								setEditing.off();
							} else {
								setUnique.off();
							}
						}}
					>
						<Icon as={FaCheck} boxSize={4} />
					</InsetButton>
				) : (
					<InsetButton onClick={setEditing.on}>
						<Icon as={FaEdit} boxSize={4} />
					</InsetButton>
				)}
				<InsetButton onClick={onDelete}>
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

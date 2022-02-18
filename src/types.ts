import { DateTime, Duration } from "luxon";

type TodoItemData = {
	title: string;
	description: string;
	isFixed: boolean;
	duration: Duration;
	startTime?: DateTime;
};

export type { TodoItemData };

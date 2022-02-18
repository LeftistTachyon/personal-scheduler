import { DateTime } from "luxon";

type TodoItemData = {
	title: string;
	description: string;
	isFixed: boolean;
	/**
	 * A duration stored as the number of minutes
	 */
	duration: number;
	startTime?: DateTime;
};

export type { TodoItemData };

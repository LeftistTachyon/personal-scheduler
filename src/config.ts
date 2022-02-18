type MetaType = {
	title: string;
	lang: string;
	description: string;
	url: string;
	image: string;
	tags: string[];
};

const META: MetaType = {
	title: "Personal Scheduler",
	lang: "en-us",
	description: "A little web app for scheduling your day",
	url: "http://personal-scheduler.vercel.app/",
	image: "/logo.png",
	tags: ["schedule", "organize", "app"],
};

export { META };

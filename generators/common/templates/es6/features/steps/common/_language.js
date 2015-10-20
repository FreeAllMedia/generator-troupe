import inflect from "jargon";

export function friendlyToClass(friendly) {
	//HACK: fix jargon issue with pascal from human
	return `${inflect(friendly).camel.pascal.toString()}`;
}

import Router from "omnirouter";
import <%= name %>Routes from "./<%= name %>Routes.js";

export default class CampaignRouter extends Router {
	initialize() {
		<%= name %>Routes.call(this);
	}
}

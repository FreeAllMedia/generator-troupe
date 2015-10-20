/* eslint-disable new-cap */
//import <%= Name %> from "../../../app/models/<%= name %>.js";
import {makeRequest} from "../common/request.js";
//TODO: check attributes and account id particular relationship
const <%= name %>s = [{
		"id": 1,
		"accountId": 1,
		<%- attributesWithValues %>
	}, {
		"id": 2,
		"accountId": 1,
		<%- attributesWithValues %>
	}
];

export default function <%= Name %>ListSteps() {
	this.When(/^<%= name %> list request is received$/, function (callback) {
		//load query mocks
		this.entityCount = <%= name %>s.length;
		this.database
			.mock
			.select("*")
			.from("<%= name %>s")
			.whereNull("deleted_at")
			.andWhere("account_id", 1)
			.results(<%= name %>s);
		//make request
		makeRequest.call(this, `/account/${<%= name %>s[0].accountId}/<%= name %>s`, "get",
			() => {
				callback();
			});
	});

	this.When(/^<%= name %> list all request is received$/, function (callback) {
		//load query mocks
		this.entityCount = <%= name %>s.length;
		this.database
			.mock
			.select("*")
			.from("<%= name %>s")
			.whereNull("deleted_at")
			.results(<%= name %>s);
		//make request
		makeRequest.call(this, `/<%= name %>s`, "get",
			() => {
				callback();
			});
	});


	this.When(/^<%= name %> list request is received but there is no <%= name %> found$/, function (callback) {
		//load query mocks
		this.database
			.mock
			.select("*")
			.from("<%= name %>s")
			.whereNull("deleted_at")
			.where("account_id", 1)
			.results([]);
		//make request
		makeRequest.call(this, `/account/${<%= name %>s[0].accountId}/<%= name %>s`, "get",
			() => {
				callback();
			});
	});
}

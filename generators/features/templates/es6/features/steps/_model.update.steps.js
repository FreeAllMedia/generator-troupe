/* eslint-disable new-cap */
//import <%= Name %> from "../../../app/models/<%= name %>.js";
import {makeRequest} from "../common/request.js";
import {dateRegex} from "../common/values.js";

const <%= name %> = {
	"id": 1,
	"accountId": 1,
	<%- attributesWithValues %>
};

const invalid<%= Name %> = {
	"id": 1,
	"accountId": 1
};

export default function <%= Name %>UpdateSteps() {
	this.When(/^<%= name %> update request is received$/, function (callback) {
		//load query mocks
		//TODO: add mocks according to your needs
		this.database
			.mock
			.select("*")
			.from("<%= _name %>s")
			.whereNull("deleted_at")
			.andWhere("id", 1)
			.limit(1)
			.results([<%= name %>]);

			this.database
				.mock
				.update({
					//TODO: add attributes
					"account_id": 1,
					"updated_at": dateRegex,
					<%- attributesWithValues %>
				})
				.into("<%= _name %>s")
				.where("id", "=", 1)
				.results(1);
		//make request
		this.body = {data: <%= name %>};
		makeRequest.call(this, `/<%= name %>/${<%= name %>.id}`, "put",
			() => {
				callback();
			});
	});

	this.When(/^an invalid <%= name %> update request is received$/, function (callback) {
		//prepare request body
		//TODO: add mocks according to your needs
		this.body = {data: invalid<%= Name %>};
		this.database
			.mock
			.select("*")
			.from("<%= _name %>s")
			.whereNull("deleted_at")
			.andWhere("id", 1)
			.limit(1)
			.results([invalid<%= Name %>]);
		//make request
		makeRequest.call(this, `/<%= name %>/${invalid<%= Name %>.id}`, "put",
			() => {
				callback();
			});
	});

	this.When(/^an unexisting <%= name %> update request is received$/, function (callback) {
		//prepare request body
		//TODO: add mocks according to your needs
		this.body = {data: invalid<%= Name %>};
		this.database
			.mock
			.select("*")
			.from("<%= _name %>s")
			.whereNull("deleted_at")
			.andWhere("id", 1)
			.limit(1)
			.results([]);
		//make request
		makeRequest.call(this, `/<%= name %>/${invalid<%= Name %>.id}`, "put",
			() => {
				callback();
			});
	});
}

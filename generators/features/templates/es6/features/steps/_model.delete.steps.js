/* eslint-disable new-cap */
//import <%= Name %> from "../../../app/models/<%= name %>.js";
import {makeRequest} from "../common/request.js";
import {dateRegex} from "../common/values.js";

const <%= name %> = {
	//TODO: add attributes
	"id": 1,
	"accountId": 1,
	"name": "test <%= name %>"
};

export default function <%= Name %>DeleteSteps() {
	this.When(/^<%= name %> delete request is received$/, function (callback) {
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
				"account_id": 1,
				"deleted_at": dateRegex,
				"updated_at": dateRegex,
				<%- fieldsWithValues %>
			})
			.into("<%= _name %>s")
			.where("id", 1)
			.results(1);
		//make request
		this.body = {data: <%= name %>};
		makeRequest.call(this, `/<%= name %>/${<%= name %>.id}`, "delete",
			() => {
				callback();
			});
	});

	this.When(/^an invalid <%= name %> delete request is received$/, function (callback) {
		//prepare request body
		this.body = {data: <%= name %>};
		//load query mocks
		//TODO: add mocks according to your needs
		this.database
			.mock
			.select("*")
			.from("<%= _name %>s")
			.whereNull("deleted_at")
			.andWhere("id", 1)
			.limit(1)
			.results([]);
		//make request
		makeRequest.call(this, `/<%= name %>/${<%= name %>.id}`, "delete",
			() => {
				callback();
			});
	});
}

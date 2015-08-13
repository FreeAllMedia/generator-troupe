/* eslint-disable new-cap */
const <%= name %>Fixtures = require("../../../spec/fixtures/<%= name %>s.json");

import Request from "appeal";

export default function <%= Name %>ControllerListSteps () {
	this.When(/^a valid list <%= name %> request is received$/, function (callback) {
		this.database.mock({
			"select * from `client_access_tokens` where `token` = 'valid-client-access-token' and `deleted_at` is null limit 1": [
				this.clientAccessTokenRecord
			],
			"select * from `client_access_tokens` where `token` = 'invalid-client-access-token' and `deleted_at` is null limit 1": [
			],
			"select * from `client_access_tokens` where `token` = 'expired-client-access-token' and `deleted_at` is null limit 1": [
				this.clientAccessTokenRecord
			]
		});

		this.querySpy = this.database.spy("select * from `<%= _name %>s`", [
			<%= name %>Fixtures[0],
			<%= name %>Fixtures[2],
			<%= name %>Fixtures[3],
			<%= name %>Fixtures[4],
			<%= name %>Fixtures[5]
		]);

		Request
			.get
			.url(this.url + "/<%= name %>s")
			.header("Content-Type", "application/vnd.api+json")
			.header("Client-Access-Token", this.clientAccessToken)
			.results((error, response) => {
				this.response = response;
				callback();
			});
	});

	this.Then(/^respond with all the list of <%= name %>s$/, function (callback) {
		this.response.body.should.have.property("data");
		this.response.body.data.length.should.equal(5);
		this.response.body.data[0].should.have.property("type");
		this.response.body.data[0].should.have.property("attributes");
		this.response.body.data[0].type.should.equal("<%= Name %>");
		this.response.body.data[0].attributes.name.should.equal(<%= name %>Fixtures[0].name);
		callback();
	});

}

/* eslint-disable new-cap */
const <%= name %>Fixtures = require("../../../spec/fixtures/<%= name %>s.json");

import Request from "appeal";

export default function <%= Name %>ControllerShowSteps () {
	this.When(/^a valid show <%= name %> details request is received$/, function when<%= Name %>RequestReceived(callback) {
		this.database.mock({
			"select * from `client_access_tokens` where `token` = 'invalid-client-access-token' and `deleted_at` is null limit 1": [
			],
			"select * from `client_access_tokens` where `token` = 'valid-client-access-token' and `deleted_at` is null limit 1": [
				this.clientAccessTokenRecord
			],
			"select * from `client_access_tokens` where `token` = 'expired-client-access-token' and `deleted_at` is null limit 1": [
				this.clientAccessTokenRecord
			],
			"select * from `<%= _name %>s` where `id` = '2' and `deleted_at` is null limit 1": [
			]
		});

		this.querySpy = this.database.spy("select * from `<%= _name %>s` where `id` = '1' and `deleted_at` is null limit 1", [
			<%= name %>Fixtures[0]
		]);

		Request
			.get
			.url(this.url + "/<%= name %>/" + this.<%= name %>Id)
			.header("Content-Type", "application/vnd.api+json")
			.header("Client-Access-Token", this.clientAccessToken)
			.results((error, response) => {
				this.response = response;
				callback();
			});
	});

	this.When(/^an invalid show <%= name %> details request is received$/, function when<%= Name %>RequestInvalidReceived(callback) {
		this.database.mock({
			"select * from `client_access_tokens` where `token` = 'valid-client-access-token' and `deleted_at` is null limit 1": [
				this.clientAccessTokenRecord
			]
		});

		Request
			.get
			.url(this.url + "/<%= name %>/as")
			.header("Content-Type", "application/vnd.api+json")
			.header("Client-Access-Token", "valid-client-access-token")
			.results((error, response) => {
				this.response = response;
				callback();
			});
	});

	this.Then(/^respond with the specified <%= name %>'s details$/, function then<%= Name %>Details(callback) {
		this.response.body.should.have.property("data");
		this.response.body.data.should.have.property("type");
		this.response.body.data.should.have.property("attributes");
		this.response.body.data.type.should.equal("<%= Name %>");
		//TODO ADD ATTRIBUTES
		this.response.body.data.attributes.name.should.equal(<%= name %>Fixtures[0].name);
		callback();
	});
}

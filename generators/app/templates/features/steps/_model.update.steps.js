/* eslint-disable new-cap */
const <%= name %>Fixtures = require("../../../spec/fixtures/<%= name %>s.json");

import Request from "appeal";

export default function <%= Name %>ControllerUpdateSteps () {
	this.When(/^a valid update <%= name %> request is received$/, function (callback) {
		this.database.mock({
			"select * from `<%= _name %>s` where `id` = '2' and `deleted_at` is null limit 1": [
			],
			"select * from `<%= _name %>s` where `id` = '1' and `deleted_at` is null limit 1": [
				<%= name %>Fixtures[0]
			],
			"select * from `client_access_tokens` where `token` = 'valid-client-access-token' and `deleted_at` is null limit 1": [
				this.clientAccessTokenRecord
			],
			"select * from `client_access_tokens` where `token` = 'invalid-client-access-token' and `deleted_at` is null limit 1": [
			],
			"select * from `client_access_tokens` where `token` = 'expired-client-access-token' and `deleted_at` is null limit 1": [
				this.clientAccessTokenRecord
			]
		});

		if(!this.<%= name %>) {
			this.<%= name %> = {};
		}

		if(this.<%= name %>.name) {
			this.<%= name %>.name = "newName";
		}

		//TODO ADD MOCKS WITH ATTRIBUTES
		this.querySpy = this.database.spy(/update `<%= _name %>s` set `title` = 'newName', `updated_at` = '[0-9\:\- \.]*' where `id` = 1/, [1]);

		Request
			.put
			.url(this.url + "/<%= name %>/" + this.<%= name %>Id)
			.header("Content-Type", "application/vnd.api+json")
			.header("Client-Access-Token", this.clientAccessToken)
			.data({data: this.<%= name %>})
			.results((error, response) => {
				this.response = response;
				callback();
			});
	});

	this.When(/^an invalid update <%= name %> request is received$/, function (callback) {
		this.database.mock({
			"select * from `client_access_tokens` where `token` = 'valid-client-access-token' and `deleted_at` is null limit 1": [
				this.clientAccessTokenRecord
			]
		});

		Request
			.put
			.url(this.url + "/<%= name %>/1")
			.header("Content-Type", "application/vnd.api+json")
			.header("Client-Access-Token", "valid-client-access-token")
			.data({data2: this.<%= name %>})
			.results((error, response) => {
				this.response = response;
				callback();
			});
	});


	this.Then(/^respond with the updated <%= name %>'s details$/, function (callback) {
		this.response.body.should.have.property("data");
		this.response.body.data.should.have.property("type");
		this.response.body.data.should.have.property("attributes");
		this.response.body.data.should.have.property("id");
		this.response.body.data.type.should.equal("<%= Name %>");
		this.response.body.data.attributes.name.should.equal("newName");
		callback();
	});
}

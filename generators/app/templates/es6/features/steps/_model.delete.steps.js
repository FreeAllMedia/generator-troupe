/* eslint-disable new-cap */
const <%= name %>Fixtures = require("../../../spec/fixtures/<%= name %>s.json");

import Request from "appeal";

export default function <%= Name %>ControllerListSteps () {

	this.When(/^a valid delete <%= name %> request is received$/, function (callback) {
		this.database.mock({
			"select * from `<%= _name %>s` where `id` = '1' and `deleted_at` is null limit 1": [
				<%= name %>Fixtures[0]
			],
			"select * from `<%= _name %>s` where `id` = '2' and `deleted_at` is null limit 1": [
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

		this.querySpy = this.database.spy(/update `<%= _name %>s` set `deleted_at` = '[0-9\:\- \.]*' where `id` = 1/, 1);

		Request
			.delete
			.url(this.url + "/<%= name %>/" + this.<%= name %>Id)
			.header("Content-Type", "application/vnd.api+json")
			.header("Client-Access-Token", this.clientAccessToken)
			.results((error, response) => {
				this.response = response;
				callback();
			});
	});

	this.When(/^an invalid delete <%= name %> request is received$/, function (callback) {
		this.database.mock({
			"select * from `client_access_tokens` where `token` = 'valid-client-access-token' and `deleted_at` is null limit 1": [
				this.clientAccessTokenRecord
			]
		});

		Request
			.delete
			.url(this.url + "/<%= name %>/as")
			.header("Content-Type", "application/vnd.api+json")
			.header("Client-Access-Token", "valid-client-access-token")
			.results((error, response) => {
				this.response = response;
				callback();
			});
	});


	this.Then(/^the delete query was executed$/, function (callback) {
		this.deleteQuerySpy.callCount.should.equal(1);
		callback();
	});

}

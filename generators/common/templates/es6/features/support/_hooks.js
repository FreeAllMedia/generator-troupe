/* eslint-disable new-cap */
import Server from "../../app/server.js";
import Model from "dovima";
import packageJson from "../../../package.json";
import nock from "nock";

export default function hooks() {
	let server,
		portNumber = 1338;

	this.Before(function Before(callback) {
		server = new Server({
			environment: "test"
		});
		server.listen(portNumber, () => {
			process.stdout.write(`\nTest server for features listening on port ${portNumber}\n`);
			//database to the world so we can mock on each scenario
			this.database = Model.database;
			packageJson.preAuthentication = true;

			this.fixtures = {};
			this.queryFixtures = {};

			this.querySpies = [];
			this.endpoints = [];
			nock.cleanAll();

			this.headers = {
				"Content-Type": "application/vnd.api+json"
			};
			delete this.body;
			this.url = `http:\/\/localhost:${portNumber}`;
			this.urlSuffix = "";
			this.accessToken = undefined;

			callback();
		});
	});

	this.After(function After(callback) {
		server.close(callback);
	});
}

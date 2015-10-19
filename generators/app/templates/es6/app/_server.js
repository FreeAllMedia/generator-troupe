import Database from "almaden";
import Model from "dovima";
import fs from "fs";

/* Route setters */
import JsonApiFormatter from "jsonapi-formatter";
import <%= Name %>Router from "./routers/<%= name %>Router.js";

/* Database Credentials */

export default class Server {
	constructor(options) {
		[
			"_router",
			"_database",
			"_options"
		].forEach((privatePropertyName) => {
			Object.defineProperty(this, privatePropertyName, {
				writable: true,
				value: undefined,
				enumerable: false
			});
		});

		this._options = options || {};

		this._options.environment = this._options.environment || "development";

		let databaseJson;
		let exists = fs.existsSync(`${__dirname}/../../database.json`);
		if(exists) {
			databaseJson = require(`${__dirname}/../../database.json`);
		} else {
			databaseJson = require(`${__dirname}/../../database.template.json`);
		}

		const databaseCredentials = databaseJson[this._options.environment];

		this._database = new Database(databaseCredentials);
		Model.database = this._database;
		this._router = new <%= Name %>Router();
		this._router.use(JsonApiFormatter);
	}

	listen(portNumber, callback) {
		this._router.listen(portNumber, callback);
	}

	close(callback) {
		this._router.close(callback);
	}
}

/* eslint-disable new-cap */
import {findStatus} from "./common/request.js";
import {friendlyToClass} from "./common/language.js";

export default function CommonSteps() {
	this.Then(/^with a class of type "([^"]*)"$/, function (type, callback) {
		const className = friendlyToClass(type);
		this.response.body.data.type.should.equal(className);
		callback();
	});

	this.Given(/^a malformed envelope$/, function (callback) {
		this.body = {data2: {}};
		callback();
	});

	this.Then(/^respond with the appropiate envelope$/, function (callback) {
		this.response.body.should.have.property("data");
		callback();
	});

	this.Then(/^with all of them$/, function (callback) {
		Array.isArray(this.response.body.data).should.be.true;
		this.response.body.data.length.should.equal(this.entityCount);
		callback();
	});

	this.Then(/^with the attribute list as follows$/, function (table, callback) {
		const attributes = table.raw()[0];
		attributes.forEach((entityAttribute) => {
			this.response.body.data.attributes.should.have.property(entityAttribute);
		});
		callback();
	});

	this.Then(/^(?:with )?http status code "([^"]*)"$/, function (status, callback) {
		const code = findStatus(status);
		this.response.status.should.equal(code);
		callback();
	});

	this.Then(/^http status code ([\d]*)$/, function (status, callback) {
		let code = parseInt(status);

		this.response.status.should.equal(code);
		callback();
	});

	this.Then(/^(?:respond )?with error message "([^"]*)"$/, function (message, callback) {
		this.response.body.should.have.property("errors");
		Array.isArray(this.response.body.errors).should.be.true;
		this.response.body.errors[0].details.should.equal(message);
		callback();
	});

	this.Then(/^respond with error message title, "([^"]*)"$/, function (message, callback) {
		this.response.body.should.have.property("errors");
		Array.isArray(this.response.body.errors).should.be.true;
		this.response.body.errors[0].title.should.equal(message);
		callback();
	});

	this.Then(/^respond with no content$/, function thenRespondItemListDetails(callback) {
		(this.response.body === undefined).should.be.true;
		callback();
	});

	this.Then(/^respond with an error message title starting with, "([^"]*)"$/, function (message, callback) {
		this.response.body.should.have.property("errors");
		Array.isArray(this.response.body.errors).should.be.true;
		this.response.body.errors[0].title.should.startsWith(message);
		callback();
	});

	this.Then(/^all the business logic has completed$/, function (callback) {
		this.querySpies.forEach((querySpy) => {
			querySpy.callCount.should.be.greaterThan(0);
		});
		this.endpoints.forEach((endpoint) => {
			endpoint.done();
		});
		callback();
	});
}

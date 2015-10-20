import Request from "appeal";
import nock from "nock";
import jargon from "jargon";
import {httpStatuses} from "omnirouter";

export function findStatus(status) {
	return httpStatuses.find((httpStatus) => {
		return (httpStatus.name === jargon(status).camel.toString());
	}).code;
}

export function mockEndpoint(endpointOptions) {
	const endpointSpy = nock(endpointOptions.baseUrl)
		[endpointOptions.method](endpointOptions.path)
		.reply(endpointOptions.status, endpointOptions.response);
	this.endpoints.push(endpointSpy);
}

export function makeRequest (resourceUrl, method, callback) {
	const url = `${this.url}${resourceUrl}${this.urlSuffix}`;
	let requestChain = Request
		[method]
		.url(url);

	Object.keys(this.headers).forEach((headerName) => {
		requestChain.header(headerName, this.headers[headerName]);
	});

	if(this.body) {
		requestChain.data(this.body);
	}

	requestChain.results((error, response) => {
			this.response = response;
			callback();
		});
}

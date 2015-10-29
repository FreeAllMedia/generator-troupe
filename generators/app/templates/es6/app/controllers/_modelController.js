import ApplicationController from "./applicationController.js";
import {NotFoundError} from "../errors.js";
import flowsync from "flowsync";
import <%= Name %> from "../models/<%= name %>.js";

const pullAccountIdFrom<%= Name %> = Symbol("pullAccountIdFrom<%= Name %>"),
	pullAccountIdFromRequest = Symbol("pullAccountIdFromRequest"),
	pullAccountIdFromUrl = Symbol("pullAccountIdFromUrl"),
	getById = Symbol("getById");

export default class <%= Name %>Controller extends ApplicationController {
	filters() {
		this.before([this.show, this.update, this.delete], this.validateId);
		this.before([this.show, this.update, this.delete], this[pullAccountIdFrom<%= Name %>]);
		this.before([this.create], this[pullAccountIdFromRequest]);
		this.before([this.list], this[pullAccountIdFromUrl]);
		this.before([this.show, this.create, this.update, this.list, this.delete], this.validateAccessToken);
	}

	//pulls the account id on which the user is trying to create the <%= name %> from the request body
	//TODO: fix according to the entity needs
	[pullAccountIdFromRequest] (request, response, next) {
		request.accountId = request.body.data.accountId;
		response.notImplemented(new Error());
		next();
	}

	//pulls the account id
	//TODO: fix according to the entity needs
	[pullAccountIdFromUrl] (request, response, next) {
		request.accountId = request.params.id;
		response.notImplemented(new Error());
		next();
	}

	//pulls out the <%= name %> from the database and get the account id from it
	//TODO: fix according to the entity needs
	[pullAccountIdFrom<%= Name %>] (request, response, next) {
		request.accountId = 1;
		response.notImplemented(new Error());
		next();
	}

	[getById](id, callback) {
		<%= Name %>
			.find
			.one
			.where("id", id)
			.results(callback);
	}

	show(request, response) {
		//TODO: this same query is executed before by a filter, implement some kind of CACHE
		this[getById](request.params.id, (findError, <%= name %>) => {
				if(findError) {
					response.internalServerError(findError);
				} else if(<%= name %> && <%= name %>.id > 0 && <%= name %>.accountId > 0) {
					response.ok(this.toJSON(<%= name %>));
				} else {
					response.notFound(new NotFoundError());
				}
			});
	}

	list(request, response) {
		//TODO: check query and method name
		<%= Name %>
			.find
			.all
			.where("accountId", request.params.id) //TODO: check query
			.results((findError, <%= name %>s) => {
					if(findError) {
						response.internalServerError(findError);
					} else if(Array.isArray(<%= name %>s)) {
						response.ok(this.toJSON(<%= name %>s));
					} else {
						response.ok(this.toJSON(<%= name %>s));
					}
				}
			);
	}

	create(request, response) {
		const newEntity = new <%= Name %>(request.body.data);

		newEntity.save(
			(createError) => {
				if(createError) {
					response.conflict(createError);
				} else {
					response.created(this.toJSON(newEntity));
				}
			}
		);
	}

	update(request, response) {
		let <%= name %>;
		flowsync.series([
				function(next) {
					this[getById](request.params.id,
						(getByIdError, result<%= Name %>) => {
							if(!result<%= Name %>) {
								next(new Error(`<%= Name %> not found for the id ${request.params.id}.`));
							} else {
								<%= name %> = result<%= Name %>;
								Object.assign(<%= name %>, request.body.data);
								next(getByIdError);
							}
						}
					);
				},
				function(next) {
					<%= name %>.save(next);
				}
			],
			(updateError) => {
				if(updateError) {
					response.conflict(updateError);
				} else if(<%= name %> && <%= name %>.id > 0 && <%= name %>.accountId > 0) {
					response.ok(this.toJSON(<%= name %>));
				} else {
					response.notFound(new NotFoundError());
				}
			}
		);
	}

	delete(request, response) {
		let <%= name %>;
		flowsync.series([
				function(next) {
					this[getById](request.params.id,
						(getByIdError, result<%= Name %>) => {
							if(!result<%= Name %>) {
								next(new Error(`<%= Name %> not found for the id ${request.params.id}.`));
							} else {
								<%= name %> = result<%= Name %>;
								Object.assign(<%= name %>, request.body.data);
								next(getByIdError);
							}
						}
					);
				},
				function(next) {
					<%= name %>.softDelete(next);
				}
			],
			(deleteError) => {
				if(deleteError) {
					response.conflict(deleteError);
				} else {
					response.noContent();
				}
			}
		);
	}
}

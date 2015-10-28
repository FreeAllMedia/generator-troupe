import ApplicationController from "./applicationController.js";
import {NotFoundError} from "../errors.js";
import {create<%= Name %>, update<%= Name %>, get<%= Name %>ById, getAccountIdFrom<%= Name %>Id, get<%= Name %>s, get<%= Name %>sByAccountId, delete<%= Name %>} from "../managers/<%= name %>Manager.js";

const pullAccountIdFrom<%= Name %> = Symbol("pullAccountIdFrom<%= Name %>"),
	pullAccountIdFromRequest = Symbol("pullAccountIdFromRequest"),
	pullAccountIdFromUrl = Symbol("pullAccountIdFromUrl");

export default class <%= Name %>Controller extends ApplicationController {
	filters() {
		this.before([this.show, this.update, this.delete], this.validateId);
		this.before([this.show, this.update, this.delete], this[pullAccountIdFrom<%= Name %>]);
		this.before([this.create], this[pullAccountIdFromRequest]);
		this.before([this.list], this[pullAccountIdFromUrl]);
		this.before([this.show, this.create, this.update, this.list, this.delete, this.listAll], this.validateAccessToken);
		this.before(this.listAll, this.isAdmin);
	}

	//pulls the account id on which the user is trying to create the <%= name %> from the request body
	//TODO: fix according to the entity needs
	[pullAccountIdFromRequest] (request, response, next) {
		request.accountId = request.body.data.accountId;
		next();
	}

	//pulls the account id
	//TODO: fix according to the entity needs
	[pullAccountIdFromUrl] (request, response, next) {
		request.accountId = request.params.id;
		next();
	}

	//pulls out the <%= name %> from the database and get the account id from it
	//TODO: fix according to the entity needs
	[pullAccountIdFrom<%= Name %>] (request, response, next) {
		getAccountIdFrom<%= Name %>Id(request.params.id,
			(findError, accountId) => {
					if(findError) {
						response.internalServerError(findError);
					} else if(accountId > 0) {
						request.accountId = accountId;
						next();
					} else {
						response.notFound(new NotFoundError());
					}
				}
			);
	}

	show(request, response) {
		//TODO: this same query is executed before by a filter, implement some kind of CACHE
		get<%= Name %>ById(request.params.id,
			(findError, <%= name %>) => {
					if(findError) {
						response.internalServerError(findError);
					} else if(<%= name %> && <%= name %>.id > 0 && <%= name %>.accountId > 0) {
						response.ok(this.toJSON(<%= name %>));
					} else {
						response.notFound(new NotFoundError());
					}
				}
			);
	}

	list(request, response) {
		//TODO: check query and method name
		get<%= Name %>sByAccountId(request.params.id,
			(findError, <%= name %>s) => {
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

	listAll(request, response) {
		get<%= Name %>s(
			(findError, <%= name %>s) => {
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
		create<%= Name %>(request.body.data,
			(createError, newEntity) => {
				if(createError) {
					response.conflict(createError);
				} else {
					response.created(this.toJSON(newEntity));
				}
			}
		);
	}

	update(request, response) {
		update<%= Name %>(request.params.id,
			request.body.data,
			(updateError, <%= name %>) => {
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
		delete<%= Name %>(request.params.id,
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

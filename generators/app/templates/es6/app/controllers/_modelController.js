import ApplicationController from "./applicationController.js";
import <%= Name %> from "../models/<%= name %>.js";
import MultiError from "blunder";
import {isAssigned} from "proven";
import {BadRequestError} from "../errors.js";

const validateId = Symbol("validateId"),
	validateData = Symbol("validateData");

export default class <%= Name %>Controller extends ApplicationController {
	filters() {
		this.before([this.show, this.delete, this.update], this[validateId]);
		this.before([this.create, this.update], this[validateData]);
	}

	show(request, response) {
		let <%= name %> = new <%= Name %>({id: request.params.id});
		<%= name %>.fetch((fetchError) => {
			if(fetchError) {
				response.notFound(fetchError);
			} else {
				response.ok(<%= name %>.toJSON());
			}
		});
	}

	create(request, response) {
		let new<%= Name %> = new <%= Name %>({
			contentPackageId: request.body.data.contentPackageId,
			name: request.body.data.name
		});

		new<%= Name %>.save((saveError) => {
			if(saveError) {
				response.conflict(saveError);
			} else {
				response.created(new<%= Name %>.toJSON());
			}
		});
	}

	update(request, response) {
		let <%= name %> = new <%= Name %>();
		<%= name %>.id = request.params.id;
		<%= name %>
		.fetch((fetchError) => {
			if(fetchError) {
				response.notFound(fetchError);
			} else {
				<%= name %>.contentPackageId = request.body.data.contentPackageId;
				<%= name %>.name = request.body.data.name;

				<%= name %>.save((saveError) => {
					if(saveError) {
						response.conflict(saveError);
					} else {
						response.ok(<%= name %>.toJSON());
					}
				});
			}
		});
	}

	delete(request, response) {
		let <%= name %> = new <%= Name %>({id: request.params.id});
		<%= name %>.fetch((fetchError) => {
			if(fetchError) {
				response.notFound(fetchError);
			} else {
				<%= name %>.delete((deleteError) => {
					if(deleteError) {
						response.internalServerError(deleteError);
					} else {
						response.noContent();
					}
				});
			}
		});
	}

	list(request, response) {
		<%= Name %>
			.find
			.all
			.results((errors, <%= Name %>s) => {
				if(errors) {
					let multiError = new MultiError(errors);
					response.conflict(multiError);
				} else {
					let result = <%= Name %>s.map((value) => {
						return value.toJSON();
					});
					response.ok(result);
				}
			});
	}

	[validateId](request, response, next) {
		if(request.params.id > 0) {
			next();
		} else {
			let error = new BadRequestError();
			response.badRequest(error);
			next(error);
		}
	}

	[validateData](request, response, next) {
		if(isAssigned.call(request.body, "data").result) {
			next();
		} else {
			let error = new BadRequestError();
			response.badRequest(error);
			next(error);
		}
	}
}

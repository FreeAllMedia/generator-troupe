import flowsync from "flowsync";
import <%= Name %> from "../models/<%= name %>.js";

//remove undefineds and nulls keys from an object
function clean(object) {
	Object.keys(object).forEach(function(k) {
		if (!object[k]) {
			delete object[k];
		}
	});

	return object;
}

function extractAttributes(attributes) {
	let {
		<%= attributeString %>
	} = attributes;
	return clean({<%= attributeString %>});
}

export function get<%= Name %>sByAccountId(accountId, callback) {
	<%= Name %>
		.find
		.all
		.where("accountId", accountId) //TODO: check query
		.results(callback);
}

export function get<%= Name %>s(callback) {
	<%= Name %>
		.find
		.all
		.results(callback);
}

export function getAccountIdFrom<%= Name %>Id(id, callback) {
	<%= Name %>
		.find
		.one
		.where("id", id)
		.results((error, result) => {
			//TODO: took the account id from the proper place
			callback(error, result.accountId);
		});
}

export function get<%= Name %>ById(id, callback) {
	<%= Name %>
		.find
		.one
		.where("id", id)
		.results(callback);
}

export function delete<%= Name %>(id, callback) {
	let <%= name %>;
	flowsync.series([
			function(next) {
				get<%= Name %>ById(id,
					(getByIdError, result<%= Name %>) => {
						if(!result<%= Name %>) {
							next(new Error(`<%= Name %> not found for the id ${id}.`));
						} else {
							<%= name %> = result<%= Name %>;
							next(getByIdError);
						}
					});
			},
			function(next) {
				<%= name %>.softDelete(next);
			}
		],
		callback);
}

export function update<%= Name %>(id, attributes, callback) {
	let <%= name %>;
	flowsync.series([
			function(next) {
				get<%= Name %>ById(id,
					(getByIdError, result<%= Name %>) => {
						if(!result<%= Name %>) {
							next(new Error(`<%= Name %> not found for the id ${id}.`));
						} else {
							<%= name %> = result<%= Name %>;
							const newAttributes = extractAttributes(attributes);
							Object.assign(<%= name %>, newAttributes);
							next(getByIdError);
						}
					});
			},
			function(next) {
				<%= name %>.save(next);
			}
		],
		(errors) => {
			callback(errors, <%= name %>);
		});
}

export function create<%= Name %>(attributes, callback) {
	const newEntityAttributes = extractAttributes(attributes);
	const newEntity = new <%= Name %>(newEntityAttributes);

	newEntity.save((saveError) => {
		callback(saveError, newEntity);
	});
}

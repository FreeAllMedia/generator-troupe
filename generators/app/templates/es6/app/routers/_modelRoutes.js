import <%= Name %>Controller from "../controllers/<%= name %>Controller.js";

export default function defineRoutes() {
	const <%= name %>Controller = new <%= Name %>Controller();
	this.get("/<%= name %>/:id")
		.cast("id", Number)
		.then((request, response) => {
			<%= name %>Controller.show(request, response);
		});
	this.delete("/<%= name %>/:id")
		.cast("id", Number)
		.then((request, response) => {
			<%= name %>Controller.delete(request, response);
		});
	this.get("/<%= name %>s")
		.then((request, response) => {
			<%= name %>Controller.list(request, response);
		});
	this.post("/<%= name %>")
		.then((request, response) => {
			<%= name %>Controller.create(request, response);
		});
	this.put("/<%= name %>/:id")
		.cast("id", Number)
		.then((request, response) => {
			<%= name %>Controller.update(request, response);
		});
}

/* eslint-disable new-cap */
import chai from "chai";
import chaiString from "chai-string";

chai.should();
chai.use(chaiString);

export default function WorldClass () {
	this.World = function World(callback) {
		callback();
	};
}

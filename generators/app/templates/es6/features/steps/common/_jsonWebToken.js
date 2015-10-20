import {jsonWebToken} from "hacher";
import packageJson from "../../../../package.json";

export function encrypt(payload) {
	const publicSalt = packageJson.publicSalt;
	return jsonWebToken.sign(payload, publicSalt, {});
}

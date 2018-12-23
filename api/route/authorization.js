'use strict'

const User = require('../../model/user');
const storageSessions = require('../../lib/storage/sessions');
const util = require('../../lib/util');


const authorization = async (data, ws) => {
	const { login, password } = data;
	let user, { token } = data;

	if (token) {
		const userId = await storageSessions.getUserIdByToken(token);
		if (!userId)
			throw new Error("Error: session with such a token does not exist (incorrect token, session is completed)!");
		user = await User.getUserById(userId);
	}
	else if (login && password) {
		user = await User.authorize(login, password);
		token = await storageSessions.addSession(user.id);
	}
	else
		throw new Error("Error: token or/and login or/and password not found!");

	ws.token = token;

	user.avatar = util.getAvatar(user.imagePath);

	delete user.salt;
	delete user.hashedPassword;
	delete user.imagePath;

	// console.log(user);
	// const imagePath = path.join(__dirname, '..', '..', user.imagePath);
	// console.log(imagePath);
	// // /home/kda/Study/CryptoCoin-WV/CryptoCoin-WV-Server/api/route/../../resourse/images/defaultAvatar.png
	// const imageType = imagePath.match(/[a-z]+$/)[0];
	// const imageName = imagePath.match(/(\w+).[a-z]+$/)[1];
	// console.log(imageType);
	// console.log(imageName);

	// const bitmap = fs.readFileSync(imagePath);
	// const base64 = new Buffer(bitmap).toString('base64');

	// const image = `data:image/${imageType};base64,${base64}`;
	// console.log(image);

	// user.avatar = {
	// 	image,
	// 	name: imageName
	// };

	return {
		ok: {
			user,
			token
		}
	};
};


module.exports = authorization;

'use strict'

const User = require('../../model/user');
const path = require('path');
const fs = require('fs');


const writeAvatarInFs = (userId, imageName, imageBase64_withMetaData) => {
	const acceptType = ['png', 'jpg', 'jpeg'];
	const typeFile = imageBase64_withMetaData
		.match(/^data:(.*?)\/([a-z]+);base64,(.+)$/)[2];

	if (!acceptType.includes(typeFile))
		throw Error('Error: incorrect image extension!');

	const imageBase64_withoutMetaData = imageBase64_withMetaData
		.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
	const bitmap = new Buffer(imageBase64_withoutMetaData, 'base64');

	const resourseAvatar = path.join('resourse', 'avatars');
	const pathAvatars = path.join(__dirname, '..', '..', resourseAvatar);
	const newAvatarName = userId + '-' + imageName;
	const pathNewAvatar = path.join(pathAvatars, newAvatarName);
	const newAvatarPath = path.join(resourseAvatar, newAvatarName); 
	const regexp = new RegExp(`^${userId}-`);

	fs.readdirSync(pathAvatars)
		.filter((fileName) =>
			fileName.match(regexp))
		.forEach((oldAvatar) =>
			fs.unlinkSync(path.join(pathAvatars, oldAvatar))
		);

	const err = fs.writeFileSync(pathNewAvatar, bitmap, 'base64');
	if (err)
		throw new Error("Error: write avatar in fs!");
	
	return newAvatarPath;
};

const personalUpdateAvatar = async (data) => {
	const { userId, imageName, imageBase64 } = data;
	if (!userId || !imageName || !imageBase64)
		throw new Error(
			"Error: userId or/and imageName or/and imageBase64 not found!"
		);

	const avatarPath = writeAvatarInFs(userId, imageName, imageBase64);
	await User.updateAvatarPath(userId, avatarPath);

	return {
		ok: {
			avatarPath
		}
	};
};


module.exports = personalUpdateAvatar;

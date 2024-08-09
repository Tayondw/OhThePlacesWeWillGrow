const AWS = require("../config/aws-config");
const s3 = new AWS.S3();

const uploadFile = (filePath, bucketName, key) => {
	const fileContent = fs.readFileSync(filePath);

	const params = {
		Bucket: bucketName,
		Key: key,
		Body: fileContent,
	};

	return s3.upload(params).promise();
};

const getFile = (bucketName, key) => {
	const params = {
		Bucket: bucketName,
		Key: key,
	};

	return s3.getObject(params).promise();
};

module.exports = {
	uploadFile,
	getFile,
};

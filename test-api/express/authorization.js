import HttpStatusCodeError from '../errors/HttpStatusCodeError.js';

export default function (req, res, next) {
	const authHeader = req.headers.authorization || '';
	const authToken = authHeader.split(' ').pop();
	if(authToken === 'HARDCODED_API_KEY') {
		req.user = {
			id: '775671ff-f70d-415d-b523-f50b05139ac9',
			identifier: 'admin@admin.com',
		};

		return next();
	}

	throw new HttpStatusCodeError(401, 'Invalid authorization');
}
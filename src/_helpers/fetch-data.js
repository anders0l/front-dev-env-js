import axios from 'axios';
// import util from 'util';

const generateHeader = (method, headers) => {
	headers = headers || {};
	if (!headers['Content-Type'] && (method === 'post' || method === 'put')) {
		headers['Content-Type'] = 'application/json';
	}
	return headers;
};

const fetch = (method, url, data, params, headers) => {
	const axiosParams = {
		method,
		url,
		data,
		params,
		timeout: 10000,
		// withCredentials: true,
		headers: generateHeader(method, headers)
	};

	return axios(axiosParams)
		.then(data => {
			// console.log(util.inspect(data.data, false, null));
			if (!data) {
				throw ({ message: 'Something went wrong with server.', type: 'crash', http_code: 500 });
			}
			if (data.status == 201 || data.status == 204) {
				return ({ data: { status: 'ok' }, http_code: data.status });
			}
			if (data.status == 404) {
				return ({ http_code: data.status });
			}
			if (data.status == 500) {
				return ({ http_code: 500 });
			}
			if (data.data === undefined) {
				throw ({ message: 'Something went wrong with server. Status 200, but data is missing', type: 'crash', http_code: 500 });
			}
			return ({ data: data.data, http_code: data.status });
		})
		.catch(err => {
			if (!err) {
				console.log('Fetch failed with unknown error', axiosParams);
				return;
			}
			if (err.response
				&& err.response.status == 401
				&& err.response.data
				&& (err.response.data.type == 'AuthFailure' || err.response.data.type == 'EmptyToken')) {
				return ({ http_code: err.response.status, data: err.response.data });
			}
			if (err.response && err.response.status) {
				// TODO log only on DEV env
				console.log(`FETCH ERROR! Method: ${method}, Code: ${err.response.status}, text: ${err.response.statusText}, url: ${url}${data ? ', data:'
					+ JSON.stringify(data) : ''}${params ? ', query:' + JSON.stringify(params) : ''}`);
				return ({ http_code: err.response.status, data: err.response.data });
			}
			if (err.errno) {
				console.log(err.errno);
				throw ({
					type: 'crash',
					http_code: 500,
					message: err.errno == 'ENOTFOUND' ? 'Broken URL' : 'Something went wrong in fetch'
				});
			}
			if (err.code && err.code === 'ECONNABORTED') {
				console.log(`FETCH TIMEOUT ERROR! Method: ${method}, Code: ${err.response.status}, text: ${err.response.statusText}, url: ${url}${data ? ', data:'
					+ JSON.stringify(data) : ''}${params ? ', query:' + JSON.stringify(params) : ''}`);
				throw ({
					type: 'action_needed',
					http_code: 408,
					message: `Internal service timeouted`,
					show_message: true,
					action_name: 'INTERNAL_SERVICE_TIMEOUT'
				});
			}
			// TODO catch timeout
			if (err) {
				console.log(err.status);
				console.log(err);
			}
		});
};

const get = (url, params, headers) => fetch('get', url, undefined, params, headers);
const post = (url, data, headers) => fetch('post', url, data, undefined, headers);
const put = (url, data, headers) => fetch('put', url, data, undefined, headers);
const del = (url, params, headers) => fetch('delete', url, undefined, params, headers);

export default {
	get,
	post,
	put,
	del
};

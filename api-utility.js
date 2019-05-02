const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

// Ping test
exports.ping = async function ping() {
	try {
		let res = await axios({
				url: 'http://sundat-api.ftcsolar.com/ping',
				method: 'get',
				timeout: 8000,
				headers: {
					'Content-Type': 'application/json',
				}
			})
			return { success: true,
					status: res.status,
					data: res.data
				};
		}
		catch (err) {
			return { success: false,
					data: err
				};
		}
}

// Fetch Inverter list from Component Library
exports.inverterList = async function inverterList(apikey) {
	try {
		let res = await axios({
				url: 'http://sundat-api.ftcsolar.com/library/inverters',
				method: 'post',
				timeout: 8000,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					apikey: apikey
				}
			})
			return { success: true,
					status: res.status,
					data: res.data
				};
		}
		catch (err) {
			return { success: false,
					data: err
				};
		}
}

// Fetch Inverter details from Component Library
exports.inverterInfo = async function inverterInfo(apikey, id) {
	try {
		let res = await axios({
				url: 'http://sundat-api.ftcsolar.com/library/inverters/' + id,
				method: 'post',
				timeout: 8000,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					apikey: apikey
				}
			})
			return { success: true,
					status: res.status,
					data: res.data
				};
		}
		catch (err) {
			return { success: false,
					data: err
				};
		}
}

// Fetch Combiner list from Component Library
exports.combinerList = async function combinerList(apikey) {
	try {
		let res = await axios({
				url: 'http://sundat-api.ftcsolar.com/library/combiners',
				method: 'post',
				timeout: 8000,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					apikey: apikey
				}
			})
			return { success: true,
					status: res.status,
					data: res.data
				};
		}
		catch (err) {
			return { success: false,
					data: err
				};
		}
}

// Fetch Combiner details from Component Library
exports.combinerInfo = async function combinerInfo(apikey, id) {
	try {
		let res = await axios({
				url: 'http://sundat-api.ftcsolar.com/library/combiners/' + id,
				method: 'post',
				timeout: 8000,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					apikey: apikey
				}
			})
			return { success: true,
					status: res.status,
					data: res.data
				};
		}
		catch (err) {
			return { success: false,
					data: err
				};
		}
}

// Fetch Module list from Component Library
exports.moduleList = async function moduleList(apikey) {
	try {
		let res = await axios({
				url: 'http://sundat-api.ftcsolar.com/library/modules',
				method: 'post',
				timeout: 8000,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					apikey: apikey
				}
			})
			return { success: true,
					status: res.status,
					data: res.data
				};
		}
		catch (err) {
			return { success: false,
					data: err
				};
		}
}

// Fetch Module details from Component Library
exports.moduleInfo = async function moduleInfo(apikey, id) {
	try {
		let res = await axios({
				url: 'http://sundat-api.ftcsolar.com/library/modules/' + id,
				method: 'post',
				timeout: 8000,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					apikey: apikey
				}
			})
			return { success: true,
					status: res.status,
					data: res.data
				};
		}
		catch (err) {
			return { success: false,
					data: err
				};
		}
}

// Request SunDAT Layout run
exports.runLayout = async function runLayout(apikey, filepath) {
	let data = new FormData();
	data.append('apikey', apikey);
	data.append('scriptfile', fs.createReadStream(path.join(__dirname, filepath)))

	try {
		let res = await axios({
				url: 'http://sundat-api.ftcsolar.com/simulation/layout',
				method: 'post',
				data: data,
				headers: {
					'Content-Type': `multipart/form-data; boundary=${data._boundary}`
				},
				onUploadProgress: function(progressEvent) {
					let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
				},
			})
			return { success: true,
					status: res.status,
					data: res.data
				};
		}
		catch (err) {
			return { success: false,
					data: err
				};
		}
}
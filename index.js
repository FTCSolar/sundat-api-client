const api = require("./api-utility.js");

const apikey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Replace with your API key
const filepath = 'sample.json';

async function testAPI() {
	let result;

	result = await api.ping();
	result.success ? console.log("Test #1 ping test successful") : console.log("Test #1 ping test failed");

	result = await api.inverterList(apikey);
	result.success ? console.log("Test #2 inverterList test successful") : console.log("Test #2 inverterList test failed");

	result = await api.inverterInfo(apikey, 1770);
	result.success ? console.log("Test #3 inverterInfo test successful") : console.log("Test #3 inverterInfo test failed");

	result = await api.combinerList(apikey);
	result.success ? console.log("Test #4 combinerList test successful") : console.log("Test #4 combinerList test failed");

	result = await api.combinerInfo(apikey, 4142);
	result.success ? console.log("Test #5 combinerInfo test successful") : console.log("Test #5 combinerInfo test failed");

	result = await api.moduleList(apikey);
	result.success ? console.log("Test #6 moduleList test successful") : console.log("Test #6 moduleList test failed");

	result = await api.moduleInfo(apikey, 110);
	result.success ? console.log("Test #7 moduleInfo test successful") : console.log("Test #7 moduleInfo test failed");

	result = await api.runLayout(apikey, filepath);
	result.success ? console.log("Test #8 runLayout test successful") : console.log("Test #8 runLayout test failed");
}

testAPI();
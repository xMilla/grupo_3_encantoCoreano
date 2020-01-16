const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// allData File Path
const filePath = path.join(__dirname, '../data/data.json');

// Helper Functions
function getAll () {
    let fileContent = fs.readFileSync(filePath, 'utf-8');
	let dataArray;
	if (fileContent == ' ') {
		dataArray = [];
	} else {
		dataArray = JSON.parse(fileContent);
	}
	return dataArray; 
}

function generateId () {
	let data = getAll();
	if (data.length == 0) {
		return 1;
	}
	let lastData = data.pop();
	return lastData.id + 1;
}

function storeData (data) {
	let allData = getAllallData();
	allData.push(data);
	fs.writeFileSync(allDataFilePath, JSON.stringify(allData, null, ' '));
}

module.exports = {getAll,generateId,storeData}
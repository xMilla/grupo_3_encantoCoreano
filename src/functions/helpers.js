const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// allData File Path
const filePath = path.join(__dirname, '../data/data.json');

// Helper Functions
function getAll (tipo) {
    let fileContent = fs.readFileSync(filePath, 'utf-8');
	let dataArray = fileContent == ' '? [] : JSON.parse(fileContent);
	let filtrado = [];
	switch (tipo){
		case 'todos':
			filtrado = dataArray;
			break;
		case 'beauty':
			filtrado = dataArray.map((dato) => dato.tipo == 'beauty');
			break;
		case 'food':
			filtrado = dataArray.map((dato) => dato.tipo == 'food');
			break;
		case ' k-pop':			
			filtrado = dataArray.map((dato) => dato.tipo == 'k-pop');
			break;
	}
	return filtrado; 
}

function generateId () {
	let data = getAll('todos');
	if (data.length == 0) {
		return 1;
	}
	let lastData = data.pop();
	return lastData.id + 1;
}

function storeData (data) {
	let allData = getAll('todos');
	newData = {
		id: generateId(),
		...data
	};
	allData.push(newData);
	fs.writeFileSync(filePath, JSON.stringify(allData, null, ' '));
}

function getProductById(id) {
	let allData = getAll('todos');
	let dataById = allData.find(data => data.id == id);
	return dataById;
}

module.exports = {getAll,generateId,storeData}
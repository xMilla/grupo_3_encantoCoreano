const fs = require('fs');
const path = require('path');
//const bcrypt = require('bcrypt');

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
			filtrado = dataArray.filter((dato) => dato.tipo == 'beauty');
			break;
		case 'food':
			filtrado = dataArray.filter((dato) => dato.tipo == 'food');
			break;
		case 'k-pop':			
			filtrado = dataArray.filter((dato) => dato.tipo == 'k-pop');
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
	return parseInt(lastData.id) + 1;
}

function storeData (data,accion) {
	let allData = getAll('todos');
	if(accion == 'add'){
		newData = {
			id: generateId(),
			...data
		};
		allData.push(newData);
	}
	else if(accion == 'borrar'){
		allData = data;		
	}
	else{
		
		let productosFinales = allData.filter(function(producto){
			
			console.log('el id del que quiero actu es: ' + data.id);
			return producto.id != data.id;
		});

		data = {
			id : parseInt(data.id),
			...data
		}
		
		
		productosFinales.push(data);
		allData = productosFinales;

	}
	fs.writeFileSync(filePath, JSON.stringify(allData, null, ' '));
}

function getProductById(id) {
	let allData = getAll('todos');
	let dataById = allData.find(data => data.id == id);
	return dataById;
}


// Users File Path
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper Functions
function getAllUsers () {
	let usersFileContent = fs.readFileSync(usersFilePath, 'utf-8');
	let usersArray;
	if (usersFileContent == '') {
		usersArray = [];
	} else {
		usersArray = JSON.parse(usersFileContent);
	}
	return usersArray;
}

function generateUserId () {
	let users = getAllUsers();
	if (users.length == 0) {
		return 1;
	}
	let lastUser = users.pop();
	return lastUser.id + 1;
}

function storeUser (userData) {
	let users = getAllUsers();
	users.push(userData);
	fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
}

module.exports = {getAll,generateId,storeData,getProductById, generateUserId , storeUser, getAllUsers}

let form = document.querySelector('#loginForm');
let submitButton = document.querySelector('button');


let formElements = Array.from(form.elements);
//Sacamos al último elemento que es el botón
formElements.pop();

// Definimos un objeto literal que contendrá los campos con error
let inputsWithErrors = {};
 
// Iteramos sobre el array de campos
for (let oneInput of formElements) {
	// Validación de campos vaciós - Asignamos el evento blur a cada campo
	oneInput.addEventListener('blur', function () {
		// Capturamos el valor del campo
		let inputValue = this.value;
		//Validamos si el valor del campo está vacío
		if(validator.isEmpty(inputValue)) {
			//Agregamos la clase "is-invalid" y eliminamos la clase "is-valid"
			this.classList.add('is-invalid');
			this.classList.remove('is-valid');
			//  Al <p> que está inmediatamente después del campo le agregamos el texto de error
			this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> es obligatorio`;
			// Agregamos al objeto de errores, un error para ese campo
			inputsWithErrors[this.name] = true;
		} else {
			// Eliminamos la clase "is-invalid"
			this.classList.remove('is-invalid');
			//  Agregamos la clase "is-valid"
			this.classList.add('is-valid');
			//  Eliminamos el texto
			this.nextElementSibling.innerHTML = '';
			// Eliminado del objeto de errores, el error de ese campo
			delete inputsWithErrors[this.name];
		}
		// Control
		console.table(inputsWithErrors);
	});

 
	 
	 

		// Evento keypress
		oneInput.addEventListener('change', function (e) {
			 
			 
		})
	

	
	//  Validamos el campo de correo electrónico
	if (oneInput.name === 'email') {
		//  Asignamos el evento change al campo
		oneInput.addEventListener('blur', function () {
			// . Capturo el valor del campo
			let inputEmailValue = this.value;			
			//  Validamos si NO está vacío y si es NO un formato de correo electrónico
			if (!validator.isEmpty(inputEmailValue) && !validator.isEmail(inputEmailValue)) {
				//  Agregamos la clase "is-invalid" y eliminamos la clase "is-valid"
				this.classList.add('is-invalid');
				this.classList.remove('is-valid');
				//  Al <p> que está inmediatamente después del campo le agregamos el texto de error
				this.nextElementSibling.innerHTML = `Debés ingresar un formato de correo electrónico`;
				// Agregamos al objeto de errores, un error para ese campo
				inputsWithErrors[this.name] = true;
			}  
		})

	
	}
 
}


//  Asignamos el evento submit al formulario
form.addEventListener('submit', function (e) {
	// 5a Iteramos el array de campos para ver si hay alguno vacío
	formElements.forEach(function (oneInput) {
		if (validator.isEmpty(oneInput.value)) {
			inputsWithErrors[oneInput.name] = true;
			oneInput.classList.add('is-invalid');
			oneInput.nextElementSibling.innerHTML = 'Campo obligatorio';
		}
	});

	console.table(inputsWithErrors);

	// Evitamos que se dispare el evento si el objeto inputsWithErrors tiene cosas
	if(Object.keys(inputsWithErrors).length > 0) {
		e.preventDefault();
	}
})



let actualEmail = "";
let numUsers;
const local = "localhost"
//localhost
//"150.136.51.44"

async function consultUser(){
    let url = `http://${local}:8080/api/user/all`;
    const responseUrl = await fetch(url);
    const convertedResUser = await responseUrl.json();
    numUsers = convertedResUser.length;
    const div = document.getElementById("userTable");
    makeTableUser(convertedResUser, div);
}

function makeTableUser(datos, div){
    
    let num = datos.length;
    let tabla;

        if(num === 0) {
            tabla = `<table border="1" class="table table-dark table-striped">
                            <tr>
                                <th style="text-align:center"> Error </th>
                            </tr>
                            <tr>
                                <td style="text-align:center"> Sin usuarios </td>
                            </tr>`;
        } else {

            tabla = `<table border="1" class="table table-dark table-striped">
            <tr>
               <th> Identificación </th>   
               <th> Nombre </th>
               <th> Correo </th>
               <th> Zona </th>
               <th> Tipo </th>
               <th> Opciones </th>
            </tr>`;

            for(let i = 0 ; i < datos.length ; i++){
        //Guardo los valores recibidos de la consulta de la anterior funcion en una variable;
            let identification = datos[i].identification;
            let name = datos[i].name;
            let email = datos[i].email;
            let zone = datos[i].zone;
            let type = datos[i].type;

            //Comparo si el dato no es nulo, si lo es el valor de la variable cambia a "Sin datos."
            if(datos[i].identification === null){
                identification = "Sin datos.";
            }
            if(datos[i].name === null){
                name = "Sin datos.";
            }
            if(datos[i].email === null){
                email = "Sin datos.";
            }
            if(datos[i].zone === null){
                zone = "Sin datos.";
            }
            if(datos[i].type === null || datos[i].type === ""){
                type = "Sin datos.";
            }

            //Pinto la tabla con los valores de las variables anteriores.
            tabla += `<tr>
                        <td> ${identification} </td>
                        <td> ${name} </td>
                        <td> ${email} </td>
                        <td> ${zone} </td>
                        <td> ${type} </td>

                        <td>
                            <div  class="buttons-table">
                                <button class="btn btn-danger" onclick="deleteUser(${datos[i].id},'${datos[i].email}')"> Eliminar </button> 
                                <button class="btn btn-primary text" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="updateUser(${datos[i].id}) "> Actualizar </button> 
                            </div>
                        </td> 
                    </tr>`
        }
    }
    //Cierro la etiqueta de la tabla
    tabla += `</table>`;
    //Agrego la tabla al DOM.
    div.innerHTML = tabla;
}

async function saveUser(){
    let id = numUsers + 1;
    let identificacion = document.getElementById("identificationUser").value;
    let nombre = document.getElementById("nameUser").value;
    let direccion = document.getElementById("addresUser").value;
    let telefono = document.getElementById("telephoneUser").value;
    let correo = document.getElementById("emailUser").value;
    let contrasena = document.getElementById("passwordUser").value;
    let zona = document.getElementById("zoneUser").value;
    let tipo = document.getElementById("typeUser").value;
    const url = `http://${local}:8080/api/user/emailexist/${correo}`;
    const responseEmail = await fetch(url);
    const convertedRes = await responseEmail.json();
    if (!convertedRes) {
        if(validateDatosUser(identificacion, nombre, direccion, telefono, correo, contrasena, zona, tipo)){
            sendCreateUser(id, identificacion, nombre, direccion, telefono, correo, contrasena, zona, tipo);
            cleanUser();
        }
    } else {
        alert("Email already used.");
        document.getElementById("emailUser").value = "";
    }
}

async function sendCreateUser(id, identificacion, nombre, direccion, telefono, correo , contrasena, zona, tipo){
    try {
        let urlNewUser = `http://${local}:8080/api/user/new`;
        let body = {
            id: id,
            identification: identificacion,
            name: nombre, 
            address: direccion,
            cellPhone: telefono,
            email: correo, 
            password: contrasena,  
            zone: zona,  
            type: tipo
        };
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        };
        await fetch(urlNewUser, fetchOptions);
        alert("El usuario se ha registrado.")
        consultUser();
    } catch (e) {
        console.log("Error: " + e);
    }
}

async function updateUser(id){
    let urlUser = `http://${local}:8080/api/user/${id}`;
    let responseUser = await fetch(urlUser);
    const convertedResUser = await responseUser.json();

    document.getElementById("add-btn").classList.add("invisible");
    document.getElementById("update-btn").classList.remove("invisible");
    document.getElementById("select-input").classList.add("invisible")

    document.getElementById("title-modal-act").innerHTML = "Actualizar usuario."

    document.getElementById("idUser").value = convertedResUser.id;
    document.getElementById("identificationUser").value = convertedResUser.identification;
    document.getElementById("nameUser").value = convertedResUser.name;
    document.getElementById("addresUser").value = convertedResUser.address;
    document.getElementById("telephoneUser").value = convertedResUser.cellPhone;
    document.getElementById("emailUser").value = convertedResUser.email;
    actualEmail = document.getElementById("emailUser").value;
    document.getElementById("passwordUser").value = convertedResUser.password;
    document.getElementById("zoneUser").value = convertedResUser.zone;
    document.getElementById("typeUser").value = convertedResUser.type;
}

async function validateChangeEmail(){

    let id = document.getElementById("idUser").value;
    let identification = document.getElementById("identificationUser").value;
    let name = document.getElementById("nameUser").value;
    let address = document.getElementById("addresUser").value;
    let telephone = document.getElementById("telephoneUser").value;
    let email = document.getElementById("emailUser").value;
    let password = document.getElementById("passwordUser").value;
    let zone = document.getElementById("zoneUser").value;
    let type = document.getElementById("typeUser").value;
    
    let url = `http://${local}:8080/api/user/emailexist/${email}`
    let response = await fetch(url);
    let convertedRes = await response.json();

    if(actualEmail != email){
        if(!convertedRes){
            sendNewUser(id, identification, name, address, telephone, email, password, zone, type)    
        } else {
            alert("Email already used.")
        }
    } else {
        sendNewUser(id, identification, name, address, telephone, email, password, zone, type)
    }
}

async function sendNewUser(id, identification, name, address, telephone, email, password, zone, type){
    try{
        let urlNewUser = `http://${local}:8080/api/user/update`
        let body = {
            id: id,
            identification: identification,
            name: name,
            address: address,
            cellPhone: telephone,
            email: email,
            password: password,
            zone: zone,
            type: type
        };
        let fetchOptions = {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        };

        await fetch(urlNewUser, fetchOptions);
        alert("Se ha actualizado el usuario.")
        sessionStorage.removeItem("zona")
        sessionStorage.removeItem("email")
        sessionStorage.setItem("zona", zone);
        sessionStorage.setItem("email", email);
        consultUser();
    } catch (e) {
        console.log("Error: " + e);
    }
}

async function deleteUser(id, email){
    let sesion = sessionStorage.getItem("email");
    if (email === sesion){
        alert("No puede eliminar su usario.");
    } else {
        try{
            let url = `http://${local}:8080/api/user/${id}`;

            let body = {
                id: id
            };
            const fetchOptions = {
                method: "DELETE",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            };
            await fetch(url, fetchOptions);
            alert("El usuario se ha eliminado");
            consultUser();
        } catch (e) {
            console.log("Error: " + e);
        }
    }
}

function addUser(){
    document.getElementById("title-modal-act").innerHTML = "Agregar usuario";
    document.getElementById("add-btn").classList.remove("invisible");
    document.getElementById("update-btn").classList.add("invisible");
    document.getElementById("select-input").classList.remove("invisible");
}

function cleanUser(){
    document.getElementById("identificationUser").value = "";
    document.getElementById("nameUser").value = "";
    document.getElementById("addresUser").value = "";
    document.getElementById("telephoneUser").value = "";
    document.getElementById("emailUser").value = "";
    document.getElementById("passwordUser").value = "";
    document.getElementById("zoneUser").value = "";
    document.getElementById("typeUser").value = "";
    document.getElementById("add-btn").classList.remove("invisible");
    document.getElementById("update-btn").classList.add("invisible");
}

document.addEventListener("DOMContentLoaded", function(){
    consultUser();
});
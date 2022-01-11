



var urlSesion = "localhost"
//localhost
//150.136.51.44

document.addEventListener("DOMContentLoaded", function(){
    let correo = sessionStorage.getItem("email")
    userLogin(correo);
});

async function userLogin(correo){
    const url = `http://${urlSesion}:8080/api/user/all`
    const responseUrl = await fetch(url);
    const convertedRes = await responseUrl.json();
    let number = convertedRes.length
    let user;
    for(let i = 0 ; i < number ; i++){
        if (convertedRes[i].email == correo){
            user = convertedRes[i];
        }
    }

    let id = user.id;
    let identificacion = user.identification;
    let nombre = user.name;
    let birthtDay = user.birthtDay;
    let monthBirthtDay = user.monthBirthtDay;
    let address = user.address;
    let cellPhone = user.cellPhone;
    let email = user.email;
    let password = user.password;
    let zona = user.zone;
    let perfil = user.type;

    
    if(identificacion === null){
        identificacion = "Sin datos";
    }
    if(nombre === null){
        nombre = "Sin datos";
    }
    if(email === null){
        email = "Sin datos";
    }
    if(perfil === null){
        perfil = "Sin datos";
    }
    if(zona === null){
        zona = "Sin datos";
    }

    let tabla = `<table border="1" class="table table-dark table-striped">
                    <tr>
                        <th> Identificación. </th>
                        <th> Nombre. </th>
                        <th> E-mail. </th>
                        <th> Perfil. </th>
                        <th> Zona. </th>
                    </tr>
                    <tr>
                        <td> ${identificacion} </td>
                        <td> ${nombre} </td>
                        <td> ${email} </td>
                        <td> ${perfil} </td>
                        <td> ${zona} </td>
                    </tr>
                </table>`
    document.getElementById("profile").innerHTML = tabla;

    saveInfo(id, identificacion, nombre, birthtDay, monthBirthtDay, address, cellPhone, password, zona, perfil)
}

function saveInfo(id, identificacion, nombre, birthtDay, monthBirthtDay, address, cellPhone, password, zona, perfil){
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("identificacion", identificacion)
    sessionStorage.setItem("name", nombre)
    sessionStorage.setItem("cumpleanos", birthtDay)
    sessionStorage.setItem("mesCumple", monthBirthtDay)
    sessionStorage.setItem("direccion", address)
    sessionStorage.setItem("telefono", cellPhone)
    sessionStorage.setItem("password", password)
    sessionStorage.setItem("zona", zona)
    sessionStorage.setItem("perfil", perfil)
}

// Login Login Login Login Login Login Login Login Login Login 

function validateEmailInput() {
    const ok = document.getElementById("thanks");
    const invalid = document.getElementById("invalid");
    const inputEmail = document.getElementById("email");
    invalid.classList.toggle("invisible");
    inputEmail.style.borderColor = "#dc3545";
    inputEmail.style.backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e")`;
    ok.classList.toggle("invisible");
    ok.classList.toggle("was-validated");
    ok.classList.toggle("valid-feedback");
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhotography(url){
    const re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return re.test(String(url).toLowerCase()); 
}

// User User User User User User User User User User User User

function validateDatosUser(identificacion, nombre, direccion, telefono, correo, contraseña, zona, tipo){
    if(identificacion.length === 0 ||  nombre.length === 0 || direccion.length === 0 || telefono.length === 0 || contraseña.length === 0 || zona.length === 0 || tipo.length === 0){
        alert("Hay campos necesarios vacios.");
        return false;
    } else if (identificacion.length < 5 || identificacion.length > 12){
        alert("El numero de identificación no es valido (5-11 caracteres)");
        document.getElementById("identificationUser").value = "";
        return false;
    } else if (nombre.length > 79 || nombre.length < 4){
        alert("El nombre no es valido(4 - 80 caracteres)");
        document.getElementById("nameUser").value = "";
        return false;
    } else if (direccion.length < 5) {
        alert("La direccion es muy corta (min 6 caracteres)");
        document.getElementById("addresUser").value = "";
        return false;
    } else if (telefono.length < 8 ) {
        alert("El numero de telefono es muy corto (min 8 caracteres)");
        document.getElementById("telephoneUser").value = "";
        return false;
    } else if (!validateEmail(correo)){
        alert("El correo no tiene una estructura valida");
        document.getElementById("emailUser").value = "";
        return false;
    } else if (contraseña.length < 8) {
        alert("Contraseña no valida (min 8 caracteres)")
        document.getElementById("passwordUser").value  = "";
        return false;
    } else {
        return true;
    }
}

function validateDatosProduct(reference, brand, category, description, price, quantity, photography, availability){
    if(reference.length === 0 || brand.length === 0 || category.length === 0 || description.length === 0 || price.length === 0 || quantity.length === 0 || photography.length === 0 || availability.length === 0){
        alert("Hay campos necesarios vacios.");
        return false;
    } else if(description.length > 79){
        alert("La descripción supera los 80 caracteres.");
        document.getElementById("descriptionProduct").value = "";
        return false;
    } else if(!validatePhotography(photography)){
        alert("Se requiere de una url.");
        document.getElementById("photographyProduct").value = "";
        return false;
    } else {
        return true;
    }
}
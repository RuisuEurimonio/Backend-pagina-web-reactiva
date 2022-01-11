



const local = "localhost"
//localhost
//"150.136.51.44"

var validated = false;
function login(event) {
    event.preventDefault();
    try {
        const email = document.getElementById("email");
        const emailValue = email.value;
        const pass = document.getElementById("pass").value;
        if (validateEmail(emailValue)) {
            if (validated === true) {
                validateEmailInput();
                email.style.borderColor = "#198754";
                email.style.backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e")`;
                loginProcess(emailValue, pass);
            } else {
                loginProcess(emailValue, pass);
            }
        } else {
            if (validated === false) {
                validated = true;
                validateEmailInput();
            }
        }
    } catch (e) {
        console.log("Error: " + e);
    }
}

async function loginProcess(email, pass) {
    try {
        /**
         * Hago el llamado del metodo de java que autentifica el email y la contraseña enviando los valores 
         * ingresados por el input.
         * Return email, password and name, si no existe el nombre sera "NO DEFINIDO".
         */
        const url = `http://${local}:8080/api/user/${email}/${pass}`;
        const response = await fetch(url);
        const convertedRes = await response.json();

        /**
         * Hago el llamado del metodo de Java que valida si existe el correo en la base de datos que
         * o no
         * return Boolean.
         */
        const urlEmail = `http://${local}:8080/api/user/emailexist/${email}`
        const responseEmail = await fetch(urlEmail);
        const convertedResEmail = await responseEmail.json();

        //Condicional que valida que el metodo con el correo ingresado si exista con el llamado anterior.
        if (convertedResEmail) {
            //Condicional que valida el nombre en base al llamado con el email y password.
            if (convertedRes.password === null) {
                alert("Email or password incorrect");
                document.getElementById("pass").value = "";
            } else {
                alert("Welcome " + convertedRes.name);
                sessionStorage.setItem("email",email )
                sessionStorage.setItem("login",true )
                window.location.href = "home.html";
            }
        } else {
            alert("Email not found.");
            document.getElementById("email").value = "";
            document.getElementById("pass").value = "";
        }
    } catch (e) {
        console.log("Error: " + e);
    }
}

async function existeEmail(email) {
    const urlEmail = `http://${local}:8080/api/user/${email}`;
    const responseEmail = await fetch(urlEmail);
    const convertedResEmail = await responseEmail.json();
    console.log(convertedResEmail);
}

function cleanSession(){
    sessionStorage.clear();
}

document.addEventListener("DOMContentLoaded", function(){
    cleanSession();
})


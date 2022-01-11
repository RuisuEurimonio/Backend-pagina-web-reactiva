


var validated = false;
const local = "localhost"
//localhost
//"150.136.51.44"
var numUsers;

async function consultUser(){
    let url = `http://${local}:8080/api/user/all`;
    const responseUrl = await fetch(url);
    const convertedResUser = await responseUrl.json();
    numUsers = convertedResUser.length;
}

function register(event) {
    event.preventDefault();
    try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email");
        const emailValue = email.value;
        const password = document.getElementById("pass").value;
        const passwordRep = document.getElementById("passRepeat").value;
        var id = numUsers + 1;
        if (validateEmail(emailValue)) {
            if (validated === true) {
                validated = false;
                validateEmailInput();
                email.style.borderColor = "#198754";
                email.style.backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e")`;
                registerProcess(id, name, emailValue, password, passwordRep);
            } else {
                registerProcess(id, name, emailValue, password, passwordRep);
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

async function registerProcess(id, name, email, password, passwordRep) {
    if (password.length > 7 && passwordRep.length > 7) {
        if (password === passwordRep) {
            if (name.length > 3) {
                const url = `http://${local}:8080/api/user/emailexist/${email}`;
                const responseEmail = await fetch(url);
                const convertedRes = await responseEmail.json();
                console.log(convertedRes);
                if (!convertedRes) {
                    sendUser(id, name, email, password);
                } else {
                    alert("Email already used.");
                    document.getElementById("email").value = "";
                }
            } else {
                alert("The name don't have 4 characters minimum")
            }
        } else {
            alert("Passwords are not similar");
        }
    } else {
        alert("The password don't have 8 characters minimum.")
    }
}

async function sendUser(id, name, email, password) {
    try {
        const urlUser = `http://${local}:8080/api/user/new`;
        const body = {
            id: id,
            email: email,
            password: password,
            name: name
        };
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        };
        const response = await fetch(urlUser, fetchOptions);
        const convertedJson = await response.json();
        console.log(convertedJson);
        alert("El usuario se ha registrado");
        document.location.href = "index.html";
    } catch (e) {
        console.log("Error: " + e);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    consultUser();
});
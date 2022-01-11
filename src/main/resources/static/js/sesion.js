document.addEventListener("DOMContentLoaded", function(){
    var correo = sessionStorage.getItem("email");
    var login = sessionStorage.getItem("login");
    if(login == false || login == null){
        document.location.href = "index.html";
        alert("No ha iniciado sesión.")
    } else {
        alert("Ha iniciado sesion con el correo: " + correo);
    }
});


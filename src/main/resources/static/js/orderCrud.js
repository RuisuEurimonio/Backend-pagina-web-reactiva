


let numProduct;
const local = "localhost"
//"localhost"
//"150.136.51.44"

async function consultProducts() {
    let url = `http://${local}:8080/api/peripherals/all`;
    const responseUrl = await fetch(url);
    const convertedResProduct = await responseUrl.json();
    numProduct = convertedResProduct.length;
    const div = document.getElementById("OrderTable");
    makeTableProducts(convertedResProduct, div);
}

function makeTableProducts(datos, div){
    let num = datos.length;
    let tabla;

    if(num == 0){
        tabla = `<table border="1" class="table table-dark table-striped">
                    <tr>
                        <th style="text-align: center"> Error </th>
                    </tr>
                    <tr>
                        <td style="text-align: center"> Sin productos. </td>
                    </tr>`;
    } else {
        tabla = `<table border="1" class="table table-dark table-striped">
                    <tr>
                        <th> Agregar. </th>
                        <th> Nombre. </th>
                        <th> Categoria. </th>
                        <th> Descripción. </th>
                        <th> Precio. </th>
                        <th> Foto. </th>
                        <th> Cantidad. </th>
                    </tr>`;

                for (let i = 0 ; i < datos.length ; i++){
                    let availability = datos[i]. availability;
                    let productArray = [];
                    productArray.push(datos[i].reference)
                    productArray.push(datos[i].brand)
                    productArray.push(datos[i].category)
                    productArray.push(datos[i].description)
                    productArray.push(datos[i].price)
                    productArray.push(datos[i].availability)
                    productArray.push(datos[i].quantity)
                    productArray.push(datos[i].photography)

                    if(availability == true) {
                        disponibilidad = `<input class="form-check-input mt-0 checkbox" type="checkbox" value="${productArray}" onchange="validateCheck(event, '${datos[i].reference}')">`;
                    } else {
                        disponibilidad = "No disponible.";
                    }

                    tabla += `<tr>
                                <td> ${disponibilidad} </td>
                                <td class="reference-product"> ${datos[i].reference} </td>
                                <td> ${datos[i].category} </td>
                                <td> ${datos[i].description} </td>
                                <td> ${datos[i].price} </td>
                                <td> <img src="${datos[i].photography}" alt="Item ${i} - ${datos[i].reference}"> </td>
                                <td> <input class="input-group-text input-request" id="count-${datos[i].reference}" type="number" min="1" max="${datos[i].quantity}" placeholder="Max ${datos[i].quantity}" style="width:100%" disabled> </td>
                            </tr>`
                }
    }
    tabla += `</table>`;
    div.innerHTML = tabla;
}

async function createOrder(){
    
    /**Esto ya se realizo */
    let url = `http://${local}:8080/api/order/all`
    let response = await fetch(url);
    let convertedRes = await response.json();

    let id = convertedRes.length + 1
    
    let salesMan = {
        id: sessionStorage.getItem("id"),
        identification: sessionStorage.getItem("identificacion"),
        name: sessionStorage.getItem("name"),
        birthtDay: sessionStorage.getItem("cumpleanos"),
        monthBirthtDay: sessionStorage.getItem("mesCumple"),
        address: sessionStorage.getItem("direccion"),
        cellPhone: sessionStorage.getItem("telefono"),
        email: sessionStorage.getItem("email"),
        password: sessionStorage.getItem("password"),
        zone: sessionStorage.getItem("zona"),
        type: sessionStorage.getItem("perfil")
    }
    
    let date = new Date();
    let dateNow = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    
    /** Hasta aqui ya se tiene */

    let products = {};
    let quantities = {};

    let adds = document.querySelectorAll(".checkbox");
    let num = adds.length;
    
    let accept = false;
    let validate = false;

    for(let i = 0 ; i < num ; i++) {
        var presionado = adds[i].checked;
        if(presionado){
            accept = true;
            let xd = adds[i].value;
            let data = xd.split(',');
            let reference = data[0];
            let brand = data[1];
            let category = data[2];
            let description = data[3];
            let price = data[4];
            let availability = data[5];
            let quantity = data[6];
            let photography = data[7];
            let body = {
                reference: reference,
                brand: brand,
                category: category,
                description: description,
                price: price,
                availability: availability,
                quantity: quantity,
                photography: photography
            }
            products[`${data[0]}`] = body;
            let count = document.getElementById(`count-${reference}`).value
            if(count === ""){
                alert("Seleccione una cantidad valida.")
                validate = false;
                break;
            } else {
                if(parseInt(count) <= parseInt(data[6])){
                    quantities[`${data[0]}`]= count;
                    validate = true;
                } else {
                    alert("Cantidad maxima sobrepasada.")
                    validate = false;
                    break;
                }
            }
        }
    }
    if(!accept){
        alert("No hay productos seleccionados.")
    } else if (!validate){    
    } else {
        console.log("Procesando datos. . .")
        postOrder(id, salesMan, dateNow, products, quantities);
    }
}

async function postOrder(id, salesMan, date, products, quantities){
    try {
        let url = `http://${local}:8080/api/order/new`
        let body = {
            id: id,
            registerDay: date,
            status: "Pendiente",
            salesMan: salesMan,
            products: products,
            quantities: quantities
        };
        let fetchOptions = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        };
        console.log(body)
        await fetch(url, fetchOptions);
        alert("El codigo de tu pedido es "+id)
        cleanTable();
    } catch (e) {
        console.log("Error: " + e);
    }
}

function cleanTable(){
    let checks = document.querySelectorAll(".checkbox");
    let inputs = document.querySelectorAll(`.input-request`)
    let num2 = inputs.length
    let num = checks.length;
    for( let i = 0 ; i < num ; i++){
        checks[i].checked = false;
    }
    for(let i = 0 ; i < num2 ; i++){
        inputs[i].value = "";
    }
}

function validateCheck(event, reference){
    let response = event.target.checked;
    let input = document.getElementById(`count-${reference}`)
    if(response){
        input.disabled = false;
    } else {
        input.disabled = true;
        input.value = "";
    }
}

function perfilButton(){
    let perfil = sessionStorage.getItem("perfil");
    if(perfil === "Coordinador de zona"){
        document.getElementById("button-add").classList.remove("invisible");
    } else if (perfil === "Asesor comercial"){
        document.getElementById("info-order").innerHTML = "Agregue un item a la orden y luego coloque la cantidad."
        document.getElementById("button-send").classList.remove("invisible");
    } else if (perfil === "Administrador"){
        document.getElementById("info-order").innerHTML = "Agregue un item a la orden y luego coloque la cantidad."
        document.getElementById("button-add").classList.remove("invisible");
        document.getElementById("button-add").style.marginRight = "2rem";
        document.getElementById("button-send").classList.remove("invisible");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    consultProducts();
    perfilButton();
    cleanTable();
})



let numOrders;
const local = "localhost";
//localhost
//150.136.51.44
let zone = sessionStorage.getItem("zona")

async function consultOrders(){
    let url = `http://${local}:8080/api/order/zona/${zone}`
    let response = await fetch(url);
    let convertedRes = await response.json();
    numOrders = convertedRes.length;
    const div = document.getElementById("OrdersTable")
    makeTableOrders(convertedRes, div, numOrders);
}

function makeTableOrders(data, div, num){
    let tabla;
    if(num === 0){
        tabla = `<table border="1" class="table table-dark table-striped">
                    <tr>
                        <th style="text-align:center"> Error. </th>
                    </tr>
                    <tr>
                        <td style="text-align:center"> Sin ordenes. </td>
                    </tr>`;
    } else {
        tabla = `<table border="1" class="table table-dark table-striped">
                    <tr>
                        <th> Identificación. </th>
                        <th> Nombre. </th>
                        <th> E-mail. </th>
                        <th> Fecha. </th>
                        <th> No. Pedido. </th>
                        <th> Estado. </th>
                        <th> Pedido. </th>
                    </tr>`;

                    for(let i = 0 ; i < num ; i++){
                        let dateData = data[i].registerDay;
                        let date = dateData.substring(0,10);
                        tabla += `<tr>
                                    <td> ${data[i].salesMan.identification} </td>
                                    <td> ${data[i].salesMan.name} </td>
                                    <td> ${data[i].salesMan.email} </td>
                                    <td> ${date} </td>
                                    <td> ${data[i].id} </td>
                                    <td> ${data[i].status} </td>
                                    <td> 
                                        <button class="btn btn-primary text" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="consultOrder(${data[i].id})"> Ver pedido. </button>
                                    </td>
                                  </tr>`;
                    }
    }
    tabla += `</table>`
    div.innerHTML = tabla;
}

async function consultOrder(id){
    let url = `http://${local}:8080/api/order/${id}`
    let response = await fetch(url);
    let data = await response.json();
    orderModal(data);
    orderProducts(data);
}

function orderModal(data){
    let dateData = data.registerDay;
    let date = dateData.substring(0,10)

    tableOrder = `<table border="1" class="table table-dark table-striped">
                    <tr>
                        <th> Fecha. </th>
                        <th> No. Pedido. </th>
                        <th> Estado. </th>
                        <th> Cambiar estado. </th>
                        <th> Guardar </th>
                    </tr>
                    <tr>
                        <td> ${date} </td>
                        <td> ${data.id} </td>
                        <td id="status-order${data.id}"> ${data.status} </td>
                        <td> 
                            <select class="form-select" id="form-select-modal${data.id}" aria-label="Default select example">
                                <option value="Pendiente" selected>Pendiente.</option>
                                <option value="Aprobado">Aprobado.</option>
                                <option value="Rechazado">Rechazado.</option>
                            </select>
                        </td>
                        <td> <button type="button" class="btn btn-success" onclick="putOrder('${date}','${data.id}')">Guardar estado.</button> </td>
                    </tr>`;
        tableOrder += `</table>`
        document.getElementById("modal-body").innerHTML = tableOrder
}

async function orderProducts(data){
    console.log(data)
    let products = data.products
    let list = new Array();

    for(let product in products) {
        list.push(product);
    }
    
    let num = list.length
    console.log(num);
    tableProducts = `<table border="1" class="table table-dark table-striped table-products">
                        <tr>
                            <th> Foto. </th>
                            <th> Referencia. </th>
                            <th> Marca. </th>
                            <th> Categoria </th>
                            <th> Descripción. </th>
                            <th> Disponibilidad. </th>
                            <th> Precio. </th>
                            <th> Cantidad. </th>
                            <th> Pedido. </th>
                        </tr>`
    for(let i = 0 ; i < num ; i++){
        let dis;
        if(products[list[i]].availability==true){
            dis = "Si.";
        } else {
            dis = "No."
        }

        if(data.quantities[list[i]] === undefined){
            cant = "No hay datos."
        } else {
            cant = data.quantities[list[i]];
        }
        console.log("la wea")
        tableProducts += `<tr>
                            <td> <img src="${products[list[i]].photography}" </td>
                            <td> ${products[list[i]].reference} </td>
                            <td> ${products[list[i]].brand} </td>
                            <td> ${products[list[i]].category} </td>
                            <td> ${products[list[i]].description} </td>
                            <td> ${dis} </td>
                            <td> ${products[list[i]].price} </td>
                            <td> ${products[list[i]].quantity} </td>
                            <td> ${cant} </td>
                            </tr>`
    }
    tableProducts += `</table>`
    console.log(tableProducts)
    document.getElementById("modal-footer").innerHTML = tableProducts;
}

async function putOrder(date, id){

    let status = document.getElementById(`form-select-modal${id}`).value;
    console.log(status);

    let url = `http://${local}:8080/api/order/update`
    let body = {
        id: id,
        registerDay: date,
        status: status
    };
    let fetchOptions = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    };

    await fetch(url, fetchOptions);
    alert("Estado actualizado")
    document.getElementById(`status-order${id}`).innerHTML = status;
    consultOrders();
}

document.addEventListener("DOMContentLoaded", function(){
    consultOrders();
})
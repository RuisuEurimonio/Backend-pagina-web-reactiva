


let numProduct;
const local = "localhost"
//localhost
//"150.136.51.44"

async function consultProduct() {
    let url = `http://${local}:8080/api/peripherals/all`;
    const responseUrl = await fetch(url);
    const convertedResProduct = await responseUrl.json();
    numProduct = convertedResProduct.length;
    const div = document.getElementById("productTable");
    makeTableProduct(convertedResProduct, div);
}

function makeTableProduct(datos, div) {

    let num = datos.length;
    let tabla;

    if (num === 0) {
        tabla = `<table border="1" class="table table-dark table-striped">
                            <tr>
                                <th style="text-align:center"> Error </th>
                            </tr>
                            <tr>
                                <td style="text-align:center"> Sin productos. </td>
                            </tr>`;
    } else {

        tabla = `<table border="1" class="table table-dark table-striped">
            <tr>
               <th> Referencia </th>   
               <th> Marca. </th>
               <th> Categoria </th>
               <th> Descripción. </th>
               <th> Precio. </th>
               <th> Disponibilidad </th>
               <th> Cantidad </th>
               <th> Foto. </th>
               <th> Opciones </th>
            </tr>`;

        for (let i = 0; i < datos.length; i++) {
            let availability = datos[i].availability;

            if (availability == true) {
                disponibilidad = "Si";
            } else {
                disponibilidad = "No";
            }

            //Pinto la tabla con los valores de las variables anteriores.
            tabla += `<tr>
                        <td> ${datos[i].reference} </td>
                        <td> ${datos[i].brand} </td>
                        <td> ${datos[i].category} </td>
                        <td> ${datos[i].description} </td>
                        <td> ${datos[i].price} </td>
                        <td> ${disponibilidad} </td>
                        <td> ${datos[i].quantity} </td>
                        <td> <img src="${datos[i].photography}" alt="Item ${i} - ${datos[i].reference}"> </td>

                        <td class="container-buttons">
                            <div  class="buttons-table">
                                <button class="btn btn-danger" onclick="deleteProduct('${datos[i].reference}')"> Eliminar </button> 
                                <button class="btn btn-primary text" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="updateProduct('${datos[i].reference}')"> Actualizar </button> 
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

function saveProduct() {
    let reference = document.getElementById("referenceProduct").value;
    let brand = document.getElementById("brandProduct").value;
    let category = document.getElementById("categoryProduct").value;
    let description = document.getElementById("descriptionProduct").value;
    let price = document.getElementById("priceProduct").value;
    let quantity = document.getElementById("quantityProduct").value;
    let photography = document.getElementById("photographyProduct").value;
    let availability = document.getElementById("availabilityProduct").value;
    if (validateDatosProduct(reference, brand, category, description, price, quantity, photography, availability)) {
        sendCreateProduct(reference, brand, category, description, price, quantity, photography, availability);
        cleanProduct();
    }
}

async function sendCreateProduct(reference, brand, category, description, price, quantity, photography, availability) {
    try {
        let urlNewProduct = `http://${local}:8080/api/peripherals/new`;
        let body = {
            reference: reference,
            brand: brand,
            category: category,
            description: description,
            price: price,
            quantity: quantity,
            photography: photography,
            zoavailabilityne: availability
        };
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        };
        await fetch(urlNewProduct, fetchOptions);
        alert("El producto se ha registrado.")
        consultProduct();
        cleanProduct();
    } catch (e) {
        console.log("Error: " + e);
    }
}

async function updateProduct(reference) {
    let urlProduct = `http://${local}:8080/api/peripherals/${reference}`;
    let responseProduct = await fetch(urlProduct);
    const convertedResProduct = await responseProduct.json();

    document.getElementById("add-btn").classList.add("invisible");
    document.getElementById("update-btn").classList.remove("invisible");
    document.getElementById("reference-div").classList.add("invisible");

    document.getElementById("title-modal-act").innerHTML = "Actualizar Producto.";

    document.getElementById("referenceProduct").value = convertedResProduct.reference;
    document.getElementById("brandProduct").value = convertedResProduct.brand;
    document.getElementById("categoryProduct").value = convertedResProduct.category;
    document.getElementById("descriptionProduct").value = convertedResProduct.description;
    document.getElementById("priceProduct").value = convertedResProduct.price;
    document.getElementById("quantityProduct").value = convertedResProduct.quantity;
    document.getElementById("photographyProduct").value = convertedResProduct.photography;
    document.getElementById("availabilityProduct").value = convertedResProduct.availability;
}

async function sendNewProduct(){

    let reference = document.getElementById("referenceProduct").value;
    let brand = document.getElementById("brandProduct").value;
    let category = document.getElementById("categoryProduct").value;
    let description = document.getElementById("descriptionProduct").value;
    let price = document.getElementById("priceProduct").value;
    let quantity = document.getElementById("quantityProduct").value;
    let photography = document.getElementById("photographyProduct").value;
    let availability = document.getElementById("availabilityProduct").value;

    try{
        let urlNewProduct = `http://${local}:8080/api/peripherals/update`
        let body = {
            reference: reference,
            brand: brand,
            category: category,
            description: description,
            price: price,
            quantity: quantity,
            photography: photography,
            availability: availability
        };
        let fetchOptions = {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        };

        await fetch(urlNewProduct, fetchOptions);
        alert("Se ha actualizado el usuario.")
        consultProduct();
        cleanProduct();
    } catch (e) {
        console.log("Error: " + e);
    }
}

async function deleteProduct(reference){
        try{
            let url = `http://${local}:8080/api/peripherals/${reference}`;

            let body = {
                reference: reference
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
            alert("El producto se ha eliminado");
            consultProduct();
        } catch (e) {
            console.log("Error: " + e);
        }
}

function addProduct(){
    cleanProduct();
    document.getElementById("title-modal-act").innerHTML = "Agregar producto";
    document.getElementById("add-btn").classList.remove("invisible");
    document.getElementById("update-btn").classList.add("invisible");
    document.getElementById("reference-div").classList.remove("invisible");
}

function cleanProduct(){
    document.getElementById("referenceProduct").value = "";
    document.getElementById("brandProduct").value = "";
    document.getElementById("categoryProduct").value = "";
    document.getElementById("descriptionProduct").value = "";
    document.getElementById("priceProduct").value = "";
    document.getElementById("quantityProduct").value = "";
    document.getElementById("photographyProduct").value = "";
    document.getElementById("availabilityProduct").value = "";
    document.getElementById("add-btn").classList.remove("invisible");
    document.getElementById("update-btn").classList.add("invisible");
}

document.addEventListener("DOMContentLoaded", function () {
    consultProduct();
    let user = sessionStorage.getItem("perfil");
    let perfil = user
    if(perfil == "Sin datos" ){
        let button = document.getElementById("button-add");
        document.getElementById("button_add-container").removeChild(button)
    }
    console.log(perfil)
})
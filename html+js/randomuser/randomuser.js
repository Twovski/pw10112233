var datos = [];
var numero = 0;
var cantidad = 0;

async function apirandomuser(){
    cantidad = document.getElementById("cantidad").value;
    const respuesta = await fetch("http://randomuser.me/api?results=" + cantidad);
    datos = await respuesta.json();
    muestra()
}

function anterior(){
    //numero = numero ? numero - 1 : cantidad - 1;
    if(numero)
        numero -= 1;
    else
        numero = cantidad - 1;
    muestra();
}

function siguiente(){
    //numero = numero + 1 == cantidad ? 0 : numero + 1;
    if(numero + 1 == cantidad)
        numero = 0;
    else
        numero += 1;
    muestra();
}


function muestra(){
    console.log("Arreglo posicion: " + numero);
    const foto = document.getElementById("foto");
    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    foto.setAttribute("src", datos.results[numero].picture.large);
    nombre.innerHTML = datos.results[numero].name.first + " " + datos.results[numero].name.last;
    telefono.innerHTML = datos.results[numero].phone;
}
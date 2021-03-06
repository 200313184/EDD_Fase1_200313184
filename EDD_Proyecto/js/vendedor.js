let vendedores = new avl();
let proveedores = new abb();
let usuario = new nodoAvl();
let inventario = new arbolB();
let rutas = new Grafo();
let ventas = new TablaHash();

function inicializar_listas(){
    console.log("Entro a inicializar listas ");
    var tem_vendedores = JSON.parse(sessionStorage.getItem("vendedores"));
    vendedores = new avl();
    tem_vendedores = CircularJSON.parse(tem_vendedores);
    Object.assign(vendedores,tem_vendedores);

    var tem_proveedores = JSON.parse(sessionStorage.getItem("proveedores"));
    proveedores = new abb();
    tem_proveedores = CircularJSON.parse(tem_proveedores);
    Object.assign(proveedores,tem_proveedores);

    var tem_inventario = JSON.parse(sessionStorage.getItem("inventario"));
    inventario = new arbolB();
    tem_inventario = CircularJSON.parse(tem_inventario);
    Object.assign(inventario,tem_inventario);

    var tem_rutas = JSON.parse(sessionStorage.getItem("rutas"));
    rutas = new Grafo();
    tem_rutas = CircularJSON.parse(tem_rutas);
    Object.assign(rutas,tem_rutas);

    var tem_usuarios = JSON.parse(sessionStorage.getItem("usuario"));
    usuario = new nodoAvl();
    tem_usuarios = CircularJSON.parse(tem_usuarios);
    Object.assign(usuario,tem_usuarios);

    var tem_ventas = JSON.parse(sessionStorage.getItem("ventas"));
    ventas = new TablaHash();
    tem_ventas = CircularJSON.parse(tem_ventas);
    Object.assign(ventas,tem_ventas);

    if(usuario.id == undefined || usuario.id == NaN){
        location.href="../login.html";
    }
}


function agregar_cliente(){
    let id_cliente1 = document.getElementById('id_cliente1').value;
    let nombre_cliente1 = document.getElementById('nombre_cliente1').value;
    let correo_cliente1 = document.getElementById('correo_cliente1').value;
    let vend = vendedores.buscar(usuario.id);
    let clientes = new listaCliente();
    Object.assign(clientes, vend.lista_clientes);
    clientes.insertar(id_cliente1, nombre_cliente1, correo_cliente1);
    vend.lista_clientes =clientes;
    var lista_vendedores = CircularJSON.stringify(vendedores);
    sessionStorage.setItem("vendedores",JSON.stringify(lista_vendedores));
    alert("Se agrego al cliente exitosamente");
}

function eliminar_cliente(){
    let nombre_cliente2 = document.getElementById('nombre_cliente2').value;
    let correo_cliente2 = document.getElementById('correo_cliente2').value;
    let vend = vendedores.buscar(usuario.id);
    let clientes = new listaCliente();
    Object.assign(clientes, vend.lista_clientes);
    clientes.eliminar(nombre_cliente2, correo_cliente2);
    vend.lista_clientes =clientes;
    var lista_vendedores = CircularJSON.stringify(vendedores);
    sessionStorage.setItem("vendedores",JSON.stringify(lista_vendedores));
    alert("Se elimino al cliente exitosamente");

}
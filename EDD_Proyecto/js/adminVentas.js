let vendedores = new avl();
let proveedores = new abb();
let usuario = new nodoAvl();
let inventario = new arbolB();
let rutas = new Grafo();
let ventas = new TablaHash();

let compras = new listaProductos();
let productos = [];
let total = 0;

let transacciones = {};

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

    var tem_transacciones = JSON.parse(sessionStorage.getItem("transacciones"));
    transacciones = [];
    tem_transacciones = CircularJSON.parse(tem_transacciones);
    Object.assign(transacciones,tem_transacciones);

    if(usuario.id == undefined || usuario.id == NaN){
        location.href="../login.html";
    }
}

function agregar_producto(){
    let id_producto = document.getElementById('id_producto').value;
    let cantidad = document.getElementById('cantidad').value;

    let producto = inventario.buscar(id_producto);
    if(producto != null){
        console.log("Esta agregando");
        compras.agregar(producto,cantidad);
        productos.push({"id":id_producto,"cantidad":cantidad});
        total += producto.precio * cantidad;
        producto.cantidad = producto.cantidad - cantidad;
    }
    var lista_inventario = CircularJSON.stringify(inventario);
    sessionStorage.setItem("inventario",JSON.stringify(lista_inventario));
    alert("Inventario actualizado");
}

function iniciar_lista(){
    compras = new listaProductos();
    productos=[];
    alert("Lista iniciada con exito");
}

function agregar_venta(){
    let id_hash = document.getElementById('id_hash').value;
    let nombre_cliente = document.getElementById('nombre_cliente').value;

    let vend = vendedores.buscar(usuario.id);
    if(vend != null){
        let clientes = new listaCliente();
        Object.assign(clientes, vend.lista_clientes);

        //let cli = clientes.buscarCliente(nombre_cliente);
        //if(cli != null){
            ventas.insertarVenta(id_hash, vend, nombre_cliente, total, compras);
            transacciones.push({"id":id_hash,"vendedor":vend.nombre,"cliente":nombre_cliente,"productos":productos});
        //}
    }

    var lista_ventas = CircularJSON.stringify(ventas);
    sessionStorage.setItem("ventas",JSON.stringify(lista_ventas));
    var lista_transacciones = CircularJSON.stringify(transacciones);
    sessionStorage.setItem("transacciones",JSON.stringify(lista_transacciones));
    alert("Venta agregado con exito");
}
let vendedores = new avl();
let proveedores = new abb();
let usuario = new nodoAvl();
let inventario = new arbolB();
let rutas = new Grafo();
let ventas = new TablaHash();
let transacciones = {};
transacciones.ventas = [];
let bloques = new BlockChain();


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
    transacciones.ventas=[];
    tem_transacciones = CircularJSON.parse(tem_transacciones);
    Object.assign(transacciones,tem_transacciones);

    var tem_bloques = JSON.parse(sessionStorage.getItem("bloques"));
    bloques =  new BlockChain();
    tem_bloques = CircularJSON.parse(tem_bloques);
    Object.assign(bloques,tem_bloques);

    if(usuario.id == undefined || usuario.id == NaN){
        location.href="../login.html";
    }
}

function agregar_bloque(){
    transacciones.push({"ventas":transacciones.ventas});
    bloques.agregar(JSON.stringify(transacciones));
    transacciones.ventas=[];
    var lista_transacciones = CircularJSON.stringify(transacciones);
    sessionStorage.setItem("transacciones",JSON.stringify(lista_transacciones));
    var lista_bloques = CircularJSON.stringify(bloques);
    sessionStorage.setItem("bloques",JSON.stringify(lista_bloques));
    bloques.Graficar();
}
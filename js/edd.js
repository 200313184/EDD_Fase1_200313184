let vendedores = new avl();
let proveedores = new abb();
let inventario = new arbolB();
let rutas = new Grafo();
let ventas = new TablaHash();
let transacciones = {};
transacciones.ventas = [];
let bloques = new BlockChain();
let dificultad = 3;

function inicializar_listas(){
    var tem_vendedores = JSON.parse(sessionStorage.getItem("vendedores"));
    if(tem_vendedores != null){
        vendedores = new avl();
        tem_vendedores = CircularJSON.parse(tem_vendedores);
        Object.assign(vendedores,tem_vendedores);
    }else{
        vendedores = new avl();
        vendedores.insertar(200313184,"Admin", 28, "glopez1206gmail.com", "1234");
    }

    var tem_proveedores = JSON.parse(sessionStorage.getItem("proveedores"));
    if(tem_proveedores != null){
        proveedores = new abb();
        tem_proveedores = CircularJSON.parse(tem_proveedores);
        Object.assign(proveedores,tem_proveedores);
    }else{
        proveedores = new abb();
    }

    var tem_inventario = JSON.parse(sessionStorage.getItem("inventario"));
    if(tem_inventario != null){
        inventario = new arbolB();
        tem_inventario = CircularJSON.parse(tem_inventario);
        Object.assign(inventario,tem_inventario);
    }else{
        inventario = new arbolB();
    }

    var tem_ventas = JSON.parse(sessionStorage.getItem("ventas"));
    if(tem_ventas != null){
        ventas = new TablaHash();
        tem_ventas = CircularJSON.parse(tem_ventas);
        Object.assign(ventas,tem_ventas);
    }else{
        ventas = new TablaHash();
    }

    var tem_rutas = JSON.parse(sessionStorage.getItem("rutas"));
    if(tem_rutas != null){
        rutas = new Grafo();
        tem_rutas = CircularJSON.parse(tem_rutas);
        Object.assign(rutas,tem_rutas);
    }else{
        rutas = new Grafo();
    }

    var tem_transacciones = JSON.parse(sessionStorage.getItem("transacciones"));
    if(tem_transacciones != null){
        transacciones = [];
        transacciones.ventas=[];
        transacciones = CircularJSON.parse(tem_transacciones);
        Object.assign(transacciones,tem_transacciones);
    }else{
        transacciones = [];
        transacciones.ventas=[];
    }

    var tem_bloques = JSON.parse(sessionStorage.getItem("bloques"));
    if(tem_bloques != null){
        bloques = new BlockChain();
        bloques = CircularJSON.parse(tem_bloques);
        Object.assign(bloques,tem_bloques);
    }else{
        bloques = new BlockChain();
    }

}
 
function validar_usuario(){
    let nuevo_id = document.getElementById('id_usuario').value;
    let nuevo_pass = document.getElementById('pass').value;
    if(nuevo_id == "Admin" && nuevo_pass == "1234"){
        var lista_vendedores = CircularJSON.stringify(vendedores);
        sessionStorage.setItem("vendedores",JSON.stringify(lista_vendedores));
        var lista_proveedores = CircularJSON.stringify(proveedores);
        sessionStorage.setItem("proveedores",JSON.stringify(lista_proveedores));
        var lista_inventario = CircularJSON.stringify(inventario);
        sessionStorage.setItem("inventario",JSON.stringify(lista_inventario));
        var lista_rutas = CircularJSON.stringify(rutas);
        sessionStorage.setItem("rutas",JSON.stringify(lista_rutas));
        var lista_ventas = CircularJSON.stringify(ventas);
        sessionStorage.setItem("ventas",JSON.stringify(lista_ventas));
        var lista_transacciones = CircularJSON.stringify(transacciones);
        sessionStorage.setItem("transacciones",JSON.stringify(lista_transacciones));
        var lista_bloques = CircularJSON.stringify(bloques);
        sessionStorage.setItem("bloques",JSON.stringify(lista_bloques));
        let usu = vendedores.buscar(200313184);
        var l_usuario = CircularJSON.stringify(usu);
        sessionStorage.setItem("usuario",JSON.stringify(l_usuario));
        location.href="./examples/admin.html";
    }else{
        let usuario = vendedores.buscar(nuevo_id);
        console.log(usuario);
        if(usuario != null){
            console.log(nuevo_pass);
            if(usuario.password == nuevo_pass){
                var lista_vendedores = CircularJSON.stringify(vendedores);
                sessionStorage.setItem("vendedores",JSON.stringify(lista_vendedores));
                var lista_proveedores = CircularJSON.stringify(proveedores);
                sessionStorage.setItem("proveedores",JSON.stringify(lista_proveedores));
                var lista_inventario = CircularJSON.stringify(inventario);
                sessionStorage.setItem("inventario",JSON.stringify(lista_inventario));
                var lista_rutas = CircularJSON.stringify(rutas);
                sessionStorage.setItem("rutas",JSON.stringify(lista_rutas));
                var lista_ventas = CircularJSON.stringify(ventas);
                sessionStorage.setItem("ventas",JSON.stringify(lista_ventas));
                var lista_transacciones = CircularJSON.stringify(transacciones);
                sessionStorage.setItem("transacciones",JSON.stringify(lista_transacciones));
                var lista_bloques = CircularJSON.stringify(bloques);
                sessionStorage.setItem("bloques",JSON.stringify(lista_bloques));
                var l_usuario = CircularJSON.stringify(usuario);
                sessionStorage.setItem("usuario",JSON.stringify(l_usuario));
                location.href="./examples/vendedor.html";
            }else{
                console.log("ERROR CONTRASEÑA INCORRECTA");
            }
        }else{
            console.log("ERROR USUARIO NO ENCONTRADO");
        }
    }
}
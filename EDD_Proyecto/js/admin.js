let vendedores = new avl();
let proveedores = new abb();
let usuario = new nodoAvl();

function inicializar_listas(){
    var tem_vendedores = JSON.parse(sessionStorage.getItem("vendedores"));
    vendedores = new avl();
    tem_vendedores = CircularJSON.parse(tem_vendedores);
    Object.assign(vendedores,tem_vendedores);

    var tem_proveedores = JSON.parse(sessionStorage.getItem("proveedores"));
    proveedores = new avl();
    tem_proveedores = CircularJSON.parse(tem_proveedores);
    Object.assign(proveedores,tem_proveedores);

    var tem_usuarios = JSON.parse(sessionStorage.getItem("usuario"));
    usuario = new nodoAvl();
    tem_usuarios = CircularJSON.parse(tem_usuarios);
    Object.assign(usuario,tem_usuarios);

    console.log(usuario);

    if(usuario.id == undefined){
        location.href="../login.html";
    }
}

function agregar_proveedor(){
    let id_proveedor = document.getElementById('id_proveedor').value;
    let nombre_proveedor = document.getElementById('nombre_proveedor').value;
    let direc_proveedor = document.getElementById('direc_proveedor').value;
    let tel_proveedor = document.getElementById('tel_proveedor').value;
    let email_proveedor = document.getElementById('email_proveedor').value;

    proveedores.insertar(id_proveedor, nombre_proveedor, direc_proveedor, tel_proveedor, email_proveedor);

    var lista_proveedores = CircularJSON.stringify(proveedores);
    sessionStorage.setItem("proveedores",JSON.stringify(lista_proveedores));

    console.log(proveedores.graficar());
}
let vendedores = new avl();
let proveedores = new abb();
let usuario = new nodoAvl();

function inicializar_listas(){
    var tem_vendedores = JSON.parse(sessionStorage.getItem("vendedores"));
    vendedores = new avl();
    tem_vendedores = CircularJSON.parse(tem_vendedores);
    Object.assign(vendedores,tem_vendedores);

    var tem_proveedores = JSON.parse(sessionStorage.getItem("proveedores"));
    proveedores = new abb();
    tem_proveedores = CircularJSON.parse(tem_proveedores);
    Object.assign(proveedores,tem_proveedores);

    var tem_usuarios = JSON.parse(sessionStorage.getItem("usuario"));
    usuario = new nodoAvl();
    tem_usuarios = CircularJSON.parse(tem_usuarios);
    Object.assign(usuario,tem_usuarios);

    console.log(usuario);

    if(usuario.id == undefined || usuario.id == NaN){
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

    alert("Proveedor agregado con exito");
}

function agregar_usuario(){
    let id_usuario = document.getElementById('id_usuario').value;
    let nombre_usuario = document.getElementById('nombre_usuario').value;
    let edad_usuario = document.getElementById('edad_usuario').value;
    let pass_usuario = document.getElementById('pass_usuario').value;
    let email_usuario = document.getElementById('email_usuario').value;

    vendedores.insertar(id_usuario, nombre_usuario, edad_usuario, pass_usuario, email_usuario);

    var lista_vendedores = CircularJSON.stringify(vendedores);
    sessionStorage.setItem("vendedores",JSON.stringify(lista_vendedores));
    alert("Usuario agregado con exito");
}

function eliminar_proveedor(){
    let id_proveedor = document.getElementById('id_proveedor2').value;
    let eliminado = proveedores.eliminar(id_proveedor);
    var lista_proveedores = CircularJSON.stringify(proveedores);
    sessionStorage.setItem("proveedores",JSON.stringify(lista_proveedores));

    if(eliminado != null){
        alert("Proveedor eliminado con exito");
    }else{
        alert("Error al eliminar el proveedor");
    }
}
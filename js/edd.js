let vendedores = new avl();
let proveedores = new abb();


function inicializar_listas(){
    vendedores = new avl();
    vendedores.insertar(200313184,"Admin", 28, "glopez1206gmail.com", "1234");
    proveedores = new abb();
}
 
function validar_usuario(){
    let nuevo_id = document.getElementById('id_usuario').value;
    let nuevo_pass = document.getElementById('pass').value;
    if(nuevo_id == "Admin" && nuevo_pass == "1234"){
        var lista_vendedores = CircularJSON.stringify(vendedores);
        sessionStorage.setItem("vendedores",JSON.stringify(lista_vendedores));
        var lista_proveedores = CircularJSON.stringify(proveedores);
        sessionStorage.setItem("proveedores",JSON.stringify(lista_proveedores));
        let usu = vendedores.buscar(200313184);
        var l_usuario = CircularJSON.stringify(usu);
        sessionStorage.setItem("usuario",JSON.stringify(l_usuario));
        location.href="./examples/admin.html";
    }else{
        let usuario = vendedores.buscar(nuevo_id);
        if(usuario != null){
            console.log(nuevo_pass);
            if(usuario.password == nuevo_pass){
                var lista_vendedores = CircularJSON.stringify(vendedores);
                sessionStorage.setItem("vendedores",JSON.stringify(lista_vendedores));
                var lista_proveedores = CircularJSON.stringify(proveedores);
                sessionStorage.setItem("proveedores",JSON.stringify(lista_proveedores));
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
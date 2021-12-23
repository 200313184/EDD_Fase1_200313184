let vendedores = new avl();
let proveedores = new abb();
let usuario = new nodoAvl();

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

    var tem_usuarios = JSON.parse(sessionStorage.getItem("usuario"));
    usuario = new nodoAvl();
    tem_usuarios = CircularJSON.parse(tem_usuarios);
    Object.assign(usuario,tem_usuarios);

    console.log(usuario);

    if(usuario.id == undefined || usuario.id == NaN){
        location.href="../login.html";
    }
}

function agregar_actividad(){
    let mes_calendario = document.getElementById('mes_calendario').value;
    let dia_calendario = document.getElementById('dia_calendario').value;
    let hora_calendario = document.getElementById('hora_calendario').value;
    let desc_calendario = document.getElementById('desc_calendario').value;

    let vend = vendedores.buscar(usuario.id);
    if(vend != null){
        let mes = vendedores.buscarMeses(vend, mes_calendario);
        if(mes != null){
            let meses = new listaMeses();
            Object.assign(meses, vend.lista_meses);
            meses.insertarCalendario(mes, desc_calendario, hora_calendario, dia_calendario);
            vend.lista_meses = meses;
        }
    }
    var lista_vendedores = CircularJSON.stringify(vendedores);
    sessionStorage.setItem("vendedores",JSON.stringify(lista_vendedores));
}
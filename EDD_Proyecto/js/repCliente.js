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

    if(usuario.id == undefined){
        location.href="../login.html";
    }

}

function graficar_repcliente(){
    let id_vend = document.getElementById('id_vendedor');
    var vend = vendedores.buscar(id_vend);
    var sample = vendedores.graficarClientes(vend);
    document.getElementById('exampleFormControlTextarea1').value = sample;

    var options = {
    format: 'svg'
    // format: 'png-image-element'
    }

    var image = Viz(sample, options);
    var main = document.getElementById('main');

    main.innerHTML = image;		// SVG
    main.appendChild(image);	// PNG
}
let vendedores = new avl();
let proveedores = new abb();
let usuario = new nodoAvl();
let inventario = new arbolB();
let rutas = new Grafo();

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

    if(usuario.id == undefined || usuario.id == NaN){
        location.href="../login.html";
    }
}

function graficar_repcalendario(){
    let id_vend = document.getElementById('id_vendedor').value;
    let id_mes = document.getElementById('mes_calendario').value;
    let vend = vendedores.buscar(id_vend);
    console.log(vend);
    let meses = new listaMeses();
    Object.assign(meses, vend.lista_meses);

    let mes = meses.buscar(id_mes);
    console.log(mes);

    let mat = new Matriz();
    Object.assign(mat, mes.Matriz);

    let sample = mat.graficar();

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

function graficar_calendUsuario(){
    let id_vend = usuario.id;
    let id_mes = document.getElementById('mes_calendario').value;
    let vend = vendedores.buscar(id_vend);
    console.log(vend);
    let meses = new listaMeses();
    Object.assign(meses, vend.lista_meses);

    let mes = meses.buscar(id_mes);
    console.log(mes);

    let mat = new Matriz();
    Object.assign(mat, mes.Matriz);

    let sample = mat.graficar();

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
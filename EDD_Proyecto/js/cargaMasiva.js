let vendedores = new avl();
let proveedores = new abb();
let usuario = new nodoAvl();
let inventario = new arbolB();
let rutas = new Grafo();
let ventas = new TablaHash();
let transacciones = {};
transacciones.ventas = [];

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

    if(usuario.id == undefined || usuario.id == NaN){
        location.href="../login.html";
    }
}


function loadFileAsText(){
    var fileToLoad = document.getElementById("fileMassive").files[0];
    var e = document.getElementById("tipo");
    var tipoCarga = e.value;
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result;
        realizarCarga(textFromFileLoaded,tipoCarga);
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}

function realizarCarga(texto,tipo){
    var json = JSON.parse(texto);
    if(tipo==1){
        cargaVendedores(json);
    }else if(tipo==2){
        cargaClientes(json);
    }else if(tipo==3){
        cargaProveedores(json);
    }else if(tipo==4){
        cargaEventos(json);
    }else if(tipo==5){
        cargaInventario(json);
    }else if(tipo==6){
        cargaRutas(json);
    }else if(tipo==7){
        CargarVentas(json);
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function CargarVentas(json){
    for(x of json.ventas){
        
        let vend = vendedores.buscarNombre(x.vendedor);
        if(vend != null){
            let clientes = new listaCliente();
            Object.assign(clientes, vend.lista_clientes);

            let cli = clientes.buscarCliente(x.cliente);
            let lista_productos = new listaProductos();
            let productos = [];
            let total = 0;
            if(cli != null){
                for(y of x.productos){
                    let producto = inventario.buscar(y.id);
                    if(producto != null){
                        productos.push({"id":y.id,"cantidad":y.cantidad});
                        lista_productos.agregar(producto,y.cantidad);
                        total += producto.precio * y.cantidad;
                        producto.cantidad = producto.cantidad - y.cantidad;
                    }
                }
            }
            ventas.insertarVenta(x.id, vend, cli, total, lista_productos);
            transacciones.ventas.push({"id":x.id,"vendedor":x.vendedor,"cliente":x.cliente,"productos":productos});
        }
        console.log(JSON.stringify(transacciones));
    }

    var lista_ventas = CircularJSON.stringify(ventas);
    sessionStorage.setItem("ventas",JSON.stringify(lista_ventas));

    var lista_inventario = CircularJSON.stringify(inventario);
    sessionStorage.setItem("inventario",JSON.stringify(lista_inventario));

    var lista_transacciones = CircularJSON.stringify(transacciones);
    sessionStorage.setItem("transacciones",JSON.stringify(lista_transacciones));

    alert("Ventas cargadas con exito");
}

function cargaRutas(json){
    for(x of json.rutas){
        let nuevaFila = new nodoGrafo(x.nombre, x.id, 0, 0);
        let nuevaColumna = new nodoGrafo(x.nombre, 0, x.id, 0);
        rutas.insertarFila(nuevaFila);
        rutas.insertarColumna(nuevaColumna);
        for(y of x.adyacentes){
            let nuevaFila2 = new nodoGrafo(y.nombre, y.id, 0, 0);
            let nuevaColumna2 = new nodoGrafo(y.nombre, 0, y.id, 0);
            rutas.insertarFila(nuevaFila2);
            rutas.insertarColumna(nuevaColumna2);
            rutas.insertar(y.nombre, x.id, y.id, y.distancia);
            rutas.insertar(y.nombre, y.id, x.id, y.distancia);
        }
    }
    var lista_rutas = CircularJSON.stringify(rutas);
    console.log(rutas.graficar());
    console.log(rutas.graficarGrafo());
    sessionStorage.setItem("rutas",JSON.stringify(lista_rutas));
    alert("Rutas cargadas con exito");
}

function cargaInventario(json){
    for(x of json.productos){
        inventario.insertar(x.id, x.nombre, x.precio, x.cantidad);
    }
    var lista_inventario = CircularJSON.stringify(inventario);
    sessionStorage.setItem("inventario",JSON.stringify(lista_inventario));
    alert("Inventario cargado con exito");
}

function cargaVendedores(json){
    for(x of json.vendedores){
        vendedores.insertar(x.id, x.nombre, x.edad, x.correo, x.password);
    }
    var lista_vendedores = CircularJSON.stringify(vendedores);
    sessionStorage.setItem("vendedores",JSON.stringify(lista_vendedores));
    alert("Vendedores cargados con exito");
}

function cargaClientes(json){
    for(x of json.vendedores){
        let vend = vendedores.buscar(x.id);
        let clientes = new listaCliente();
        Object.assign(clientes, vend.lista_clientes);
        for(y of x.clientes){
            if(vend != null){
                clientes.insertar(y.id, y.nombre, y.correo);
            }
        }
        vend.lista_clientes = clientes;
    }
    var lista_vendedores = CircularJSON.stringify(vendedores);
    sessionStorage.setItem("vendedores",JSON.stringify(lista_vendedores));
    alert("Clientes cargados con exito");
}

function cargaProveedores(json){
    for(x of json.proveedores){
        proveedores.insertar(x.id, x.nombre, x.direccion, x.telefono, x.correo);
    }
    var lista_proveedores = CircularJSON.stringify(proveedores);
    sessionStorage.setItem("proveedores",JSON.stringify(lista_proveedores));
    alert("Proveedores cargados con exito");
}

function cargaEventos(json){
    for(x of json.vendedores){
        let vend = vendedores.buscar(x.id);
        let meses = new listaMeses();
        Object.assign(meses, vend.lista_meses);
        for(y of x.eventos){
            if(vend != null){
                let mes = vendedores.buscarMeses(vend, y.mes);
                if(mes != null){
                    meses.insertarCalendario(mes, y.desc, y.hora, y.dia);
                }
            }
        }
        vend.lista_meses = meses;
    }
    var lista_vendedores = CircularJSON.stringify(vendedores);
    sessionStorage.setItem("vendedores",JSON.stringify(lista_vendedores));
    alert("Eventos cargados con exito");
}
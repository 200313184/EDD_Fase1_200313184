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
    }
}

function cargaVendedores(json){
    for(x of json.vendedores){
        vendedores.insertar(x.id, x.nombre, x.edad, x.correo, x.password);
    }
    var lista_vendedores = CircularJSON.stringify(vendedores);
    sessionStorage.setItem("vendedores",JSON.stringify(lista_vendedores));
}

function cargaClientes(json){
    for(x of json.vendedores){
        for(y of x.clientes){
            console.log(x.id);
            let vend = vendedores.buscar(x.id);
            if(vend != null){
                vendedores.insertarCliente(vend, y.id, y.nombre, t.correo);
            }
        }
    }
    var lista_vendedores = CircularJSON.stringify(vendedores);
    sessionStorage.setItem("vendedores",JSON.stringify(lista_vendedores));
}

function cargaProveedores(json){
    for(x of json.proveedores){
        proveedores.insertar(x.id, x.nombre, x.direccion, x.telefono, x.correo);
    }
    var lista_proveedores = CircularJSON.stringify(proveedores);
    sessionStorage.setItem("proveedores",JSON.stringify(lista_proveedores));
}

function cargaEventos(json){
    for(x of json.vendedores){
        for(y of x.eventos){
            let vend = vendedores.buscar(x.id);
            if(vend != null){
                let mes = vendedores.buscarMeses(vend, y.mes);
                if(mes != null){
                    ven.lista_meses.insertarCalendario(mes, y.desc, y.hora, y.dia);
                }
            }
        }
    }
    var lista_proveedores = CircularJSON.stringify(proveedores);
    sessionStorage.setItem("proveedores",JSON.stringify(lista_proveedores));
}
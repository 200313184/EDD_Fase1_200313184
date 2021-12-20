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
        console.log("Carga vendedores");
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
        console.log(x.id);
        console.log(x.nombre);
        console.log(x.edad);
        console.log(x.correo);
        console.log(x.password);
    }
}

function cargaClientes(json){
    for(x of json.vendedores){
        for(y of x.clientes){
            console.log(x.id);
            console.log(y.id);
            console.log(y.nombre);
            console.log(y.correo);
        }
    }
}

function cargaProveedores(json){
    for(x of json.proveedores){
        console.log(x.id);
        console.log(x.nombre);
        console.log(x.direccion);
        console.log(x.telefono);
        console.log(x.correo);
    }
}

function cargaEventos(json){
    for(x of json.vendedores){
        for(y of x.eventos){
            console.log(x.id);
            console.log(y.mes);
            console.log(y.dia);
            console.log(y.hora);
            console.log(y.desc);
        }
    }
}
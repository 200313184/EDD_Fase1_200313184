class nodoLista{
    constructor(nodoProducto,siguiente){
        this.nodoProducto = nodoProducto;
        this.siguiente= siguiente;
    }
}

class listaProductos{
    constructor(){
        this.cabeza = null;
    }

    agregar(nodoProducto){
        const nuevo = new nodoLista(nodoProducto,null);
        if(this.cabeza!=null){
            this.cabeza=nuevo;
        }else{
            var aux = this.cabeza;
            while(aux.siguiente!=null){
                aux=aux.siguiente;
            }
            aux.siguiente= nuevo;
        }
    }

    graficar(){
        var node ="[label = \"{<n>";
        var aux = this.cabeza;
        while(aux.siguiente!=null){
            node = node + aux.nodoProducto.id+"-"+ aux.nodoProducto.nombre+"|";
            aux=aux.siguiente;
        }
        node = node + aux.nodoProducto.id+"-"+ aux.nodoProducto.nombre+"</p>}];";
        return node;
    }
}

class Venta {
    constructor(idVenta, vendedor,cliente, totalVenta, posicion,listaProductos) {
        this.idVenta = idVenta;
        this.vendedor = vendedor;
        this.cliente = cliente;
        this.totalVenta = totalVenta;
        this.posicion = posicion;
        this.listaProductos = listaProductos;
    }
}

class TablaHash {
    constructor() {
        this.sizeHash = 7;
        this.hash = this.table = new Array(7);
        this.iteracion = 0;
    }

    modular(venta) {
        var posicion = venta.idVenta % this.sizeHash;
        return posicion;
    }

    insertarHash(hash, venta) {
        var pos = venta.posicion;
        var posicion = pos;
        if (hash[posicion] == undefined) {
            hash[posicion] = venta;
            this.iteracion = 0;
        }
        else {
            this.realizariteracion(venta);
        }
        this.aumentarSize(hash);
    }

    insertarVenta(idVenta, vendedor, cliente, totalVenta,listaProductos) {
        var posicion = parseInt(this.modular(venta),10);
        var venta = new Venta(idVenta,vendedor,cliente,totalVenta,posicion,listaProductos);
        this.insertarHash(this.hash, venta);
    }

    realizariteracion(datos) {
        this.iteracion= this.iteracion + 1;
        datos.posicion = datos.posicion + Math.pow(this.iteracion, 2);
        while (datos.posicion >= this.sizeHash) {
            datos.posicion = datos.posicion - this.sizeHash;
        }
        if (datos.posicion < 0) {
            datos.posicion = datos.posicion * (-1);
        }
        this.insertarHash(this.hash, datos);
    }

    aumentarSize(hash) {
        var ContadorDatos = 0;
        for (let num = 0; num < hash.length; num++) {
            if (hash[num] != undefined) {
                ContadorDatos= ContadorDatos+1;
            }
        }
        
        if (ContadorDatos > (this.sizeHash / 2)) {
            this.buscarSize(this.sizeHash);
            this.hash = new Array(this.sizeHash);
            for (let num = 0; num < hash.length; num++) {
                if (hash[num] != undefined) {
                    hash[num].posicion = this.modular(hash[num]);
                    this.iteracion = 0;
                    this.insertarHash(this.hash, hash[num]);
                }
            }
        }        
    }

    buscarSize(tamanio) {
        var a = 0;
        var n = tamanio + 2;
        for (let i = 1; i < (n + 1); i++) {
            if (n % i == 0) {
                a++;
            }
        }
        if (a != 2) {
            this.buscarSize(n);
        }
        else {
            this.sizeHash = n;
        }
    }

    Graficar() {
        console.log(this.hash);
        var grafica = "digraph Tabla{";
        grafica += "\r\n";
        grafica += "node[shape=record,width=1,height=1];";
        grafica += "\r\n";
        grafica += "node [width = 5];"
        grafica += "\r\n";
        grafica += "nodet[label=\"";
        for (let num = 0; num < this.sizeHash; num++) {
            grafica = "<f"+num+">"+this.hash[num].idVenta+"- Cliente: "+hash[num].cliente.nombre+" Total: "+ this.hash[num].totalVenta;
            if(this.sizeHash-1 != num){
                grafica= "|";
            }
        }
        grafica += ",height=2.5];";
        grafica += "\r\n";
        grafica += "node [width = 1.5];"
        for (let num = 0; num < this.sizeHash; num++) {
            grafica += "node"+num+this.hash[num].listaProductos.graficar();
            grafica += "nodet:f"+num+"->"+"node"+num+":n;"
        }
        grafica += "\r\n";
        grafica += "}";
        console.log(grafica);
    }
}


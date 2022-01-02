class Venta {
    constructor(idVenta, nombreVendedor, nombreCliente, totalVenta, posicion) {
        this.idVenta = idVenta;
        this.nombreVendedor = nombreVendedor;
        this.nombreCliente = nombreCliente;
        this.totalVenta = totalVenta;
        this.posicion = posicion;
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

    insertarVenta(idVenta, nombreVendedor, nombreCliente, totalVenta) {
        var venta = new Venta();
        venta.idVenta = idVenta;
        venta.nombreVendedor = nombreVendedor;
        venta.nombreCliente = nombreCliente;
        venta.totalVenta = totalVenta;
        venta.posicion = parseInt(this.modular(venta),10);
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
            console.log(hash);
            console.log("contador "+ContadorDatos);
            console.log("tam "+hash.length);
            this.buscarSize(this.sizeHash);
            console.log("tam nuevo"+hash.length);
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
        grafica = grafica + "\r\n";
        grafica = grafica + "node[shape=plaintext];";
        grafica = grafica + "\r\n";
        grafica = grafica + "node1[label=<";
        grafica = grafica + "\r\n";
        grafica = grafica + "<TABLE BORDER=\"0\" CELLBORDER=\"1\" CELLSPACING=\"0\" CELLPADDING=\"4\">";
        for (let num = 0; num < this.sizeHash; num++) {
            grafica = grafica + "<TR>";
            grafica = grafica + "<TD>";
            grafica = grafica + num;
            grafica = grafica + "</TD>";
            grafica = grafica + "<TD>";
            if (this.hash[num] != undefined) {
                grafica = grafica + this.hash[num].idVenta;
            }
            grafica = grafica + "</TD>";
            grafica = grafica + "</TR>";
        }
        grafica = grafica + "</TABLE>";
        grafica = grafica + ">];";
        grafica = grafica + "\r\n";
        grafica = grafica + "}";
        console.log(grafica);
    }
}


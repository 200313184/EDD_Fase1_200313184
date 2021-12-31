class nodoProducto{
    constructor(id, nombre, precio, cantidad){
        this.id = parseInt(id, 10);
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.ant = null;
        this.sig = null;
        this.paginaIzq = null;
        this.paginaDer = null;
    }
}

class paginaB{

    constructor(){
        this.inicio = null;
        this.tam = 0;
    }

    insertarNodo(nuevo){
        if(this.inicio == null){
            this.inicio = nuevo;
            this.tam++;
            return nuevo;
        }else{
            let pivote = this.inicio;
            if(pivote.id == nuevo.id){
                return pivote;
            }
            if(nuevo.id < pivote.id){
                nuevo.sig = pivote;
                pivote.ant = nuevo;
                this.inicio = nuevo;
                nuevo.paginaDer = pivote.paginaIzq;
                this.tam++;
                return nuevo;
            }else{
                while(pivote.der != null){
                    if(nuevo.id == pivote.sig.id){
                        return pivote.sig;
                    }else if(nuevo.id < pivote.sig.id){
                        nuevo.paginaIzq = pivote.paginaDer;
                        nuevo.paginaDer = pivote.sig.paginaIzq;
                        nuevo.sig = pivote.sig;
                        nuevo.ant = pivote;
                        pivote.sig.ant = nuevo;
                        pivote.sig = nuevo;
                        this.tam++;
                        return nuevo;
                    }
                    pivote = pivote.sig;
                }
                if(pivote.id == nuevo.id){
                    return pivote;
                }
                nuevo.paginaIzq = pivote.paginaDer;
                pivote.sig = nuevo;
                nuevo.ant = pivote;
                this.tam++;
                return nuevo;
            }
        }
    }
}

class arbolB{
    constructor(){
        this.inicio = null;
    }

    insertar(id, nombre, precio, cantidad){
        let nuevo  = new nodoProducto(id, nombre, precio, cantidad);
        if(this.inicio == null){
            this.inicio = new paginaB();
            this.inicio.insertarNodo(nuevo);
            return true;
        }else{
            return insertarRecursivo(this.inicio, nuevo);
        }
    }

    insertarRecursivo(pagina, nuevo){
        let pivote = pagina.inicio;
        while(pivote != null){
            if(nuevo.id < pivote.id){
                if(pivote.paginaIzq != null){
                    let ret =  this.insertarRecursivo(pivote.paginaIzq, nuevo);
                    if(ret != null){
                        pagina.insertarNodo(ret);
                    }
                }else{
                    pagina.insertarNodo(nuevo);
                }
                break;
            }else if(pivote.sig == null){
                if(pivote.paginaDer != null){
                    let ret =  this.insertarRecursivo(pivote.paginaDer, nuevo);
                    if(ret != null){
                        pagina.insertarNodo(ret);
                    }
                }else{
                    pagina.insertarNodo(nuevo);
                }
                break;
            }
            pivote = pivote.sig;
        }
        if(pagina.tam == 5){
            // se retorna el padre que subira
            let cabeza = pagina.inicio.sig.sig; // indice 3
            let cabIns = new nodoProducto(cabeza.id, cabeza, precio, cabeza.cantidad);
            cabIns.paginaIzq = new paginaB();
            cabIns.paginaDer = new paginaB();

            cabIns.paginaIzq.insertarNodo(pagina.inicio);
            pagina.inicio.sig.sig = null;
            cabIns.paginaIzq.insertarNodo(pagina.inicio.sig);

            cabIns.paginaDer.insertarNodo(cabeza.der);
            cabeza.der.izq = null;
            cabIns.paginaDer.insertarNodo(cabeza.der.der);
            return cabIns;
        }else{
            return null;
        }
        
    }

    graficar(){
        let cadena="digraph arbolB {\n";
        cadena += "node [shape=record];\n";
        cadena+= this.graficar_nodos(this.inicio);
        cadena+="\n";
        cadena+=this.recorrido(this.inicio);
        cadena+="\n}";
        return cadena;
    }

    graficar_nodos(pagina_actual){
        let pag ="";
        if(pagina_actual != null){
            let nodoIni = pagina_actual.inicio;
            pag = "p" + nodoIni.id + "[label=\"<f0>";
            let contador = 1;
            while(nodoIni == null){
                pag += "|<f" + contador + ">" +  nodoIni.id + "|";
                contador++;
                pag += "<f" + contador + ">";
                contador++;
                nodoIni = nodoIni.sig;
            }
            pag += "\"]\n";
            nodoIni = pagina_actual.inicio;
            while(nodoIni == null){
                nodos+=this.graficar_nodos(nodoIni.paginaIzq);
                if(nodoIni.sig == null){
                    nodos+=this.graficar_nodos(nodoIni.paginaDer);
                }    
                nodoIni = nodoIni.sig;
            }
        }
        return pag;
    }

    recorrido(pagina_actual){
        let cadena="";
        let pivote = pagina_actual.inicio;
        let identificador = pivote.id;
        if(pivote.paginaIzq != null){
            let pagIzq = pivote.paginaIzq;
            cadena += "p" + identificador + ":f0->p" + pagIzq.inicio.id + ":f" + pagIzq.tam + ";\n";
        }
        if(pivote.sig == null){
            let pagDer = pivote.paginaDer;
            cadena += "p" + identificador + ":f2->p" + pagDer.inicio.id + ":f" + pagDer.tam + ";\n";
        }else{
            let suma = 0;
            let contador = 2;
            while(pivote.sig != null){
                let sum1 = contador + suma;
                let sum2 = sum1 + 2;
                if(pivote.sig.paginaIzq != null){
                    let pagIzq = pivote.sig.paginaIzq;
                    cadena += "p" + identificador + ":f"+ sum1 + "->p" + pagIzq.inicio.id + ":f" + pagIzq.tam + ";\n";
                }
                if(pivote.sig.sig == null){
                    let pagDer = pivote.sig.paginaDer;
                    cadena += "p" + identificador + ":f"+ sum2+"->p" + pagDer.inicio.id + ":f" + pagDer.tam + ";\n";
                }
                suma++;
                contador++;
                pivote = pivote.sig;
            }
        }
        return cadena;
    }
}
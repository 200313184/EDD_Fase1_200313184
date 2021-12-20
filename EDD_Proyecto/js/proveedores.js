class nodoAbb{
    constructor(id, nombre, direccion, telefono, correo){
        this.id = parseInt(id, 10);
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
        this.izq = null;
        this.der = null;
    }
}

class abb{
    constructor(){
        this.raiz = null;
    }

    insertar(id, nombre, direccion, telefono, correo){
        let nuevo = new nodoAbb(id, nombre, direccion, telefono, correo);
        if(this.raiz == null){
            this.raiz= nuevo;
            alert('Proveedor insertado con exito');
        }else{
            this.raiz = this.insertar_recursiva(this.raiz,nuevo);
        }
        console.log(this.graficar());
    }

    insertar_recursiva(raiz_actual,nuevo){
        if(raiz_actual != null){
            if(raiz_actual.id > nuevo.id){
                raiz_actual.izq = this.insertar_recursiva(raiz_actual.izq,nuevo);
            }else if(raiz_actual.id < nuevo.id){
                raiz_actual.der = this.insertar_recursiva(raiz_actual.der,nuevo);
            }else{
                alert('Proveedor no insertado, id de proveedor ya existe');
            }
            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            alert('Proveedor insertado con exito');
            return raiz_actual;
        }
    }

    buscar(id){
        if(this.raiz == null){
            return null;
        }else{
            return this.buscarRecursiva(this.raiz, id);
        }
    }

    buscarRecursiva(nodo, id){
        if(nodo.id < id){
            if(nodo.izq != null){
                return this.buscarRecursiva(nodo.izq, id);
            }else{
                return null;
            }
        }else if(nodo.id > id){
            if(nodo.der != null){
                return this.buscarRecursiva(nodo.der, id);
            }else{
                return null;
            }
        }else{
            return nodo;
        }
    }

    graficar(){
        let cadena="digraph arbol {\n";
        cadena += "node [shape=record];\n";
        cadena+= this.graficar_nodos(this.raiz);
        cadena+="\n";
        cadena+=this.recorrido(this.raiz);
        cadena+="\n}";

        console.log(cadena);
        return cadena;
    }

    graficar_nodos(raiz_actual){
        let nodos ="";
        if(raiz_actual != null){
            nodos+= "n"+raiz_actual.id+"[label=\"<f0>|<f1>"+raiz_actual.id + ":"+raiz_actual.nombre + "-" + raiz_actual.correo+"|<f2>\"]\n";
            nodos+=this.graficar_nodos(raiz_actual.izq);
            nodos+=this.graficar_nodos(raiz_actual.der);
        }
        return nodos;
    }

    recorrido(raiz_actual){
        let cadena="";
        if(raiz_actual != null){
            cadena += this.recorrido(raiz_actual.izq);
            cadena += this.recorrido(raiz_actual.der);
            if(raiz_actual.izq != null){
                cadena+="n"+raiz_actual.id + ":f0-> n"+raiz_actual.izq.id + ":f1;\n";
            }
            if(raiz_actual.der != null){
                cadena+="n"+raiz_actual.id + ":f2-> n"+raiz_actual.der.id + ":f1;\n";
            }
        }
        return cadena;
    }
}
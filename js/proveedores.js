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
            console.log('Proveedor insertado con exito');
        }else{
            this.raiz = this.insertar_recursiva(this.raiz,nuevo);
        }
    }

    insertar_recursiva(raiz_actual,nuevo){
        if(raiz_actual != null){
            if(raiz_actual.id > nuevo.id){
                raiz_actual.izq = this.insertar_recursiva(raiz_actual.izq,nuevo);
            }else if(raiz_actual.id < nuevo.id){
                raiz_actual.der = this.insertar_recursiva(raiz_actual.der,nuevo);
            }else{
                console.log('Proveedor no insertado, id de proveedor ya existe');
            }
            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            console.log('Proveedor insertado con exito');
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
        if(id < nodo.id){
            if(nodo.izq != null){
                return this.buscarRecursiva(nodo.izq, id);
            }else{
                return null;
            }
        }else if(id > nodo.id){
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
        console.log(this.raiz);
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

    eliminar(id){
        if(this.raiz != null){
            if(this.raiz.id == id){
                this.raiz = this.eliminarRecursiva(this.raiz, id);
                return this.raiz;
            }
            return this.eliminarRecursiva(this.raiz, id);
        }else{
            return null;
        }
    }

    encontrarPredecesor(nodo){
        if(nodo.der == null){
            return nodo;
        }else{
            return this.encontrarPredecesor(nodo.der);
        }
    }

    eliminarRecursiva(nodo, id){
        if(nodo == null){
            return null;
        }
        if(id < nodo.id){
            nodo.izq = this.eliminarRecursiva(nodo.izq, id);
        }else if(id > nodo.id){
            nodo.der = this.eliminarRecursiva(nodo.der, id);
        }else{
            if(nodo.izq != null && nodo.der != null){
                let maxIzq = this.encontrarPredecesor(nodo.izq);
                if(nodo.izq.id == maxIzq.id){
                    nodo.izq = maxIzq.izq;
                }
                nodo.id = maxIzq.id;
                nodo.nombre = maxIzq.nombre;
                nodo.direccion = maxIzq.direccion;
                nodo.telefono = maxIzq.telefono;
                nodo.correo = maxIzq.correo;
                this.eliminarRecursiva(nodo.izq, maxIzq.id);
                return nodo;
            } else if(nodo.izq != null){
                return nodo.izq;
            } else if(nodo.der != null){
                return nodo.der;
            } else{
                return null;
            }
        }
        return nodo;
    }
}
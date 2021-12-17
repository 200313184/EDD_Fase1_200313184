class nodoAbb{
    constructor(id, nombre, direccion, telefono, correo){
        this.id = id;
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
                console.log("ID DE PROVEEDOR YA EXISTE");
            }
            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }

    graficar(){
        let cadena="digraph arbol {\n";
        cadena+= this.graficar_nodos(this.raiz);
        cadena+="\n";
        cadena+=this.recorrido(this.raiz);
        cadena+="\n}";

        console.log(cadena);
    }

    graficar_nodos(raiz_actual){
        let nodos ="";
        if(raiz_actual != null){
            nodos+= "n"+raiz_actual.id+"[label=\""+raiz_actual.id + ":" + raiz_actual.nombre+"\"]\n";
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
                cadena+="n"+raiz_actual.id + "-> n"+raiz_actual.izq.id  + ":" + raiz_actual.nombre +"\n";
            }
            if(raiz_actual.der != null){
                cadena+="n"+raiz_actual.id + "-> n"+raiz_actual.der.id  + ":" + raiz_actual.nombre +"\n";
            }
        }
        return cadena;
    }
}
class nodoCliente{
    constructor(id, nombre, correo){
        this.id = parseInt(id, 10);
        this.nombre = nombre;
        this.correo = correo;
        this.sig = null;
        this.ant = null;
    }
}

class listaCliente{
    constructor(){
        this.inicio = null;
    }

    insertar(id, nombre, correo){
        let nuevo = new nodoCliente(id, nombre, correo);
        if(this.inicio == null){
            this.inicio = nuevo;
        }else{
            let pivote = this.inicio;
            while(pivote.sig != null){
                pivote = pivote.sig;
            }
            pivote.sig = nuevo;
            nuevo.ant = pivote;
        }
    }

    eliminar(nombre, correo){
        if(this.inicio != null){
            if(this.inicio.nombre == nombre && this.inicio.correo == correo){
                this.inicio = this.inicio.sig;
                if(this.inicio != null){
                    this.inicio.ant = null;
                }
            }else{
                let pivote = this.inicio;
                while(pivote.sig != null){
                    if(pivote.sig.nombre == nombre && pivote.sig.correo == correo){
                        pivote.sig = pivote.sig.sig;
                        if(pivote.sig != null){
                            pivote.sig.ant = pivote;
                        }
                        console.log("Cliente eliminado con exito");
                        break;
                    }
                    pivote = pivote.sig;
                }
            }
        }else{
            console.log("Error al eliminar, lista vacia");
        }
    }
}

class nodoMeses{
    constructor(id, nombre){
        this.id = id;
        this.nombre = nombre;
        this.sig = null;
        this.ant = null;
        this.Matriz = new Matriz();
    }
}

class listaMeses{
    constructor(){
        this.inicio = null;
    }

    insertar(id, nombre){
        let nuevo = new nodoMeses(id, nombre);
        if(this.inicio == null){
            this.inicio = nuevo;
        }else{
            let pivote = this.inicio;
            while(pivote.sig != null){
                pivote = pivote.sig;
            }
            pivote.sig = nuevo;
            nuevo.ant = pivote;
        }
    }

    insertarCalendario(nodo, evento, hora, dia){
        if(nodo.Matriz == null){
            nodo.Matriz = new Matriz();
        }
        let mat = new Matriz();
        Object.assign(mat, nodo.Matriz);
        let inserccion = mat.insertar(evento, hora, dia);
        if(!inserccion){
            console.log('Error al insertar en el calendario, favor revisar datos');
        }else{
            console.log('Evento insertado con exito');
        }
        nodo.Matriz = mat;
    }

    buscar(id){
        let pivote = this.inicio;
        while(pivote != null){
            if(pivote.id == id){
                return pivote;
            }
            pivote = pivote.sig;
        }
        return null;
    }
}

class nodoAvl{
    constructor(id, nombre, edad, correo, password){
        this.id = parseInt(id, 10);
        this.nombre = nombre;
        this.edad = edad;
        this.password = password;
        this.correo = correo;
        this.izq = null;
        this.der = null;
        this.lista_clientes = new listaCliente();
        this.lista_meses = new listaMeses();
        this.altura = 0;
    }
}

class avl{
    constructor(){
        this.raiz = null;
    }

    eliminar(id){
        if(this.raiz != null){
            return this.eliminarRecursiva(this.raiz, id);
        }else{
            return "Arbol vacio";
        }
    }

    encontrarSucesor(nodo){
        if(nodo.izq == null){
            return nodo;
        }else{
            return this.encontrarPredecesor(nodo.izq);
        }
    }

    eliminarRecursiva(nodo, id){
        if(nodo == null){
            return null;
        }
        let retNodo;
        if(id < nodo.id){
            nodo.izq = this.eliminarRecursiva(nodo.izq, id);
            retNodo = nodo;
        }else if(id > nodo.id){
            nodo.der = this.eliminarRecursiva(nodo.der, id);
            retNodo = nodo;
        }else{
            if(nodo.izq == null){
                let derecho = nodo.der;
                nodo.der = null;
                retNodo = derecho;
            } 
            
            if(nodo.der == null){
                let izquierdo = nodo.izq;
                nodo.izq = null;
                retNodo = izquierdo;
            } 


        }
        return nodo;
    }

    insertar(id, nombre, edad, correo, password){
        let nuevo = new nodoAvl(parseInt(id, 10), nombre, edad, correo, password);
        this.insertarMeses(nuevo);
        if(this.raiz == null){
            this.raiz= nuevo;
        }else{
            this.raiz = this.insertar_recursiva(this.raiz,nuevo);
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
        }else if(id == nodo.id){
            return nodo;
        }else{
            return null;
        }
    }

    insertarCliente(nodo, id, nombre, correo){
        console.log(nodo.lista_clientes);
        if(nodo.lista_clientes == null){
            nodo.lista_clientes = new listaCliente();
        }
        nodo.lista_clientes.insertar(id, nombre, correo);
    }

    insertarMeses(nodo){
        nodo.lista_meses = new listaMeses();
        nodo.lista_meses.insertar(1, 'Enero');
        nodo.lista_meses.insertar(2, 'Febrero');
        nodo.lista_meses.insertar(3, 'Marzo');
        nodo.lista_meses.insertar(4, 'Abril');
        nodo.lista_meses.insertar(5, 'Mayo');
        nodo.lista_meses.insertar(6, 'Junio');
        nodo.lista_meses.insertar(7, 'Julio');
        nodo.lista_meses.insertar(8, 'Agosto');
        nodo.lista_meses.insertar(9, 'Septiembre');
        nodo.lista_meses.insertar(10, 'Octubre');
        nodo.lista_meses.insertar(11, 'Noviembre');
        nodo.lista_meses.insertar(12, 'Diciembre');
    }

    buscarMeses(nodo, id){
        let pivote = new listaMeses();
        Object.assign(pivote, nodo.lista_meses);
        let retorno = pivote.buscar(id);
        nodo.lista_meses = pivote;
        return retorno;
    }

    insertar_recursiva(raiz_actual,nuevo){
        if(raiz_actual != null){
            if(raiz_actual.id > nuevo.id){
                raiz_actual.izq = this.insertar_recursiva(raiz_actual.izq,nuevo);
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izq)==-2){
                    if(nuevo.id < raiz_actual.izq.id){ 
                        raiz_actual = this.r_izquierda(raiz_actual);
                    }else{ 
                        raiz_actual = this.r_izq_der(raiz_actual);
                    }
                }
            }else if(raiz_actual.id < nuevo.id){
                raiz_actual.der = this.insertar_recursiva(raiz_actual.der,nuevo);
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izq)==2){
                    if(nuevo.id > raiz_actual.der.id){
                        raiz_actual=this.r_derecha(raiz_actual);
                    }else{
                        raiz_actual = this.r_der_izq(raiz_actual);
                    }
                }

            }else{
                console.log("NO SE PUEDE INSERTAR EL EMPLEADO");
            }
            raiz_actual.altura = this.altura_maxima(this.altura(raiz_actual.der),this.altura(raiz_actual.izq))+1;
            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }

    altura(nodo){
        return nodo != null ? nodo.altura : -1;
    }

    altura_maxima(h1,h2){
        return h2>=h1 ? h2 : h1;
    }

    r_izquierda(nodo){
        let aux = nodo.izq;
        nodo.izq= aux.der;
        aux.der = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.der),this.altura(nodo.izq)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.izq))+1;
        return aux;
    }
    
    r_derecha(nodo){
        let aux = nodo.der;
        nodo.der= aux.izq;
        aux.izq = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.izq),this.altura(nodo.der)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.der))+1;
        return aux;
    }
 
    r_izq_der(nodo){
        nodo.izq = this.r_derecha(nodo.izq);
        let aux = this.r_izquierda(nodo);
        return aux;
    }

    r_der_izq(nodo){
        nodo.der = this.r_izquierda(nodo.der);
        let aux = this.r_derecha(nodo);
        return aux;
    }

    graficar(){
        let cadena="digraph arbol {\n";
        cadena += "node [shape=record];\n";
        cadena+= this.graficar_nodos(this.raiz);
        cadena+="\n";
        cadena+=this.recorrido(this.raiz);
        cadena+="\n}";
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

    graficarClientes(nodo){
        let cadena="digraph clientes {\n";
        console.log(nodo);
        console.log(nodo.lista_clientes);
        let pivote = nodo.lista_clientes.inicio;
        while(pivote != null){
            cadena += "n" + pivote.id + "[label = \""+ pivote.id + ":" + pivote.nombre +"\"];\n";
            pivote = pivote.sig; 
        }
        pivote = nodo.lista_clientes.inicio;
        while(pivote != null){
            if(pivote.sig != null){
                cadena += "n" + pivote.id +"->";
            }else{
                cadena += "n" + pivote.id +";\n";
            }
            pivote = pivote.sig; 
        }
        cadena+="}\n";
        return cadena;
    }
}
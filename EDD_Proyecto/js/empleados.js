import {nodoMatriz, nodoInicio, Matriz} from './matriz.js';

class nodoCliente{
    constructor(id, nombre, correo){
        this.id = id;
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
        let inserccion = nodo.Matriz.insertar(evento, hora, dia);
        if(!inserccion){
            console.log('Error al insertar en el calendario, favor revisar datos');
        }else{
            console.log('Evento insertado con exito');
        }
    }
}

class nodoAvl{
    constructor(id, nombre, edad, correo, password){
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.password = password;
        this.correo = correo;
        this.izq = null;
        this.der = null;
        this.lista_clientes = null;
        this.lista_meses = null;
        this.altura = 0;
    }
}

class avl{
    constructor(){
        this.raiz = null;
    }

    insertar(id, nombre, edad, correo, password){
        let nuevo = new nodoAvl(id, nombre, edad, correo, password);
        let nuevo = new nodoAbb(id, nombre, direccion, telefono, correo);
        if(this.raiz == null){
            this.raiz= nuevo;
        }else{
            this.raiz = this.insertar_recursiva(this.raiz,nuevo);
        }
    }

    insertarCliente(nodo, id, nombre, correo){
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
        cadena+= this.graficar_nodos(this.raiz);
        cadena+="\n";
        cadena+=this.recorrido(this.raiz);
        cadena+="\n}";

        console.log(cadena);
    }

    graficar_nodos(raiz_actual){
        let nodos ="";
        if(raiz_actual != null){
            nodos+= "n"+raiz_actual.id+"[label=\""+raiz_actual.id + ":"+raiz_actual.nombre + "-" + raiz_actual.correo+"\"]\n";
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
                cadena+="n"+raiz_actual.id + "-> n"+raiz_actual.id + ":"+raiz_actual.nombre + "-" + raiz_actual.correo+"\n";
            }
            if(raiz_actual.der != null){
                cadena+="n"+raiz_actual.id + "-> n"+raiz_actual.id + ":"+raiz_actual.nombre + "-" + raiz_actual.correo+"\n";
            }
        }
        return cadena;
    }

    graficarClientes(nodo){
        let cadena="digraph clientes {\n";
        let pivote = nodo.lista_clientes.inicio;
        while(pivote != null){
            cadena += "n" + pivote.id + "[label = \""+ pivote.id + ":" + pivote.nombre +"];\n";
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
        console.log(cadena);
    }
}
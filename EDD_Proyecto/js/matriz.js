export class nodoMatriz{
    constructor(evento, hora, dia){
        this.evento = evento;
        this.hora = hora;
        this.dia = dia;
        this.izq = null;
        this.der = null;
        this.arriba = null;
        this.abajo = null;
        this.identificador = 0;
    }
}

export class nodoInicio{
    constructor(){
        this.filas = null;
        this.columnas = null;
    }
}

export class Matriz{
    constructor(){
        this.inicio = new nodoInicio(); 
        this.contadorNodo = 0;
    }

    insertarFila(nuevo){
        if(this.inicio.filas == null){
            this.inicio.filas = nuevo;
            return nuevo;
        }else{
            let pivote = this.inicio.filas;
            if(this.pivote.abajo != null){
                while(pivote.abajo.hora < nuevo.hora){
                    pivote = pivote.abajo;
                    if(pivote.abajo == null){
                        pivote.abajo = nuevo;
                        nuevo.arriba = pivote;
                        return nuevo;
                    }
                }
                if(pivote.abajo.hora == nuevo.hora){
                    return pivote.abajo;
                }
                nuevo.abajo = pivote.abajo;
                pivote.abajo.arriba = nuevo;
                nuevo.arriba = pivote;
                pivote.abajo = nuevo;
                return nuevo;
            }else{
                pivote.abajo = nuevo;
                nuevo.arriba = pivote;
                return nuevo;
            }
        }
    }

    insertarColumna(nuevo){
        if(this.inicio.columnas == null){
            this.inicio.columnas = nuevo;
            return nuevo;
        }else{
            let pivote = this.inicio.columnas;
            if(this.pivote.der != null){
                while(pivote.der.dia < nuevo.dia){
                    pivote = pivote.der;
                    if(pivote.der == null){
                        pivote.der = nuevo;
                        nuevo.izq = pivote;
                        return nuevo;
                    }
                }
                if(pivote.der.dia == nuevo.dia){
                    return pivote.der;
                }
                nuevo.der = pivote.der;
                pivote.der.izq = nuevo;
                nuevo.izq = pivote;
                pivote.der = nuevo;
                return nuevo;
            }else{
                pivote.der = nuevo;
                nuevo.izq = pivote;
                return nuevo;
            }
        }
    }

    enlazarFila(fila, nuevo){
        if(fila.der == null){
            fila.der = nuevo;
            return true;
        }else{
            let pivote = fila.der;
            if(this.pivote.der != null){
                while(pivote.der.dia < nuevo.dia){
                    pivote = pivote.der;
                    if(pivote.der == null){
                        pivote.der = nuevo;
                        nuevo.izq = pivote;
                        return true;
                    }
                }
                if(pivote.der.dia == nuevo.dia){
                    console.log("Evento existente para dicha hora y dia");
                    return false;
                }
                nuevo.der = pivote.der;
                pivote.der.izq = nuevo;
                nuevo.izq = pivote;
                pivote.der = nuevo;
                return true;
            }else{
                pivote.der = nuevo;
                nuevo.izq = pivote;
                return true;
            }
        }
    }

    enlazarColumna(columna, nuevo){
        if(columna.abajo == null){
            columna.abajo = nuevo;
            return true;
        }else{
            let pivote = columna.filas;
            if(this.pivote.abajo != null){
                while(pivote.abajo.hora < nuevo.hora){
                    pivote = pivote.abajo;
                    if(pivote.abajo == null){
                        pivote.abajo = nuevo;
                        nuevo.arriba = pivote;
                        return true;
                    }
                }
                if(pivote.abajo.hora == nuevo.hora){
                    console.log("Evento existente para dicha hora y dia");
                    return false;
                }
                nuevo.abajo = pivote.abajo;
                pivote.abajo.arriba = nuevo;
                nuevo.arriba = pivote;
                pivote.abajo = nuevo;
                return true;
            }else{
                pivote.abajo = nuevo;
                nuevo.arriba = pivote;
                return true;
            }
        }
    }

    insertar(evento, hora, dia){
        let nuevo = new nodoMatriz(evento, hora, dia);
        let nodoHora = this.insertarFila(nuevo);
        let nodoDia = this.insertarColumna(nuevo);
        if(this.enlazarFila(nodoHora, nuevo)){
            return this.enlazarColumna(nodoDia, nuevo);
        }else{
            return false;
        }
    }

    graficar(){
        let cadena="digraph arbol {\n";
        cadena+= "rankdir=UD;\n";
        cadena+= "node[shape=box];\n";
        cadena+= "{\n";
        cadena+= "rank=min;";
        cadena+= "m[label=\"matriz\"];";
        cadena+= this.graficar_filas();
        cadena+="}\n";
        cadena+=this.graficar_columnas();
        cadena+="\n";
        cadena+= this.enlazar_filas();
        cadena+="\n";
        cadena+= this.enlazar_columnas();
        cadena+="\n";
        cadena+= this.recorrer_filas();
        cadena+="\n";
        cadena+= this.recorrer_columnas();
        cadena+="}\n";
        console.log(cadena);
    }

    graficar_filas(){
        let pivote = this.inicio.filas;
        let cadena = "";
        while(pivote != null){
            cadena+="x" + pivote.hora + "[label=\"Hora: " + pivote.hora + "\",rankdir=LR];\n";
            pivote = pivote.abajo;
        }
        return cadena;
    }

    graficar_columnas(){
        let cadena = "";
        let pivote = this.inicio.columnas;
        while(pivote != null){
            cadena+="{\n";
            if(pivote.der != null){
                cadena+="rank=same;";
            }else{
                cadena+="rank=max;";
            }
            cadena+="y" + pivote.dia + "[label=\"Dia: " + pivote.dia + "\"];\n";
            let piv = pivote.abajo;
            while(piv != null){
                piv.identificador = this.contadorNodo;
                this.contadorNodo++;
                cadena+="n" + piv.identificador + "[label=\"" + piv.evento + "\"];\n";
                pov = piv.abajo;
            }
            cadena+="}\n\n";
            pivote = pivote.der;
        }
    }

    enlazar_filas(){
        let pivote = this.inicio.filas;
        let cadena = "m";
        while(pivote != null){
            if(pivote.abajo != null){
                cadena+="->x" + pivote.hora;
            }else{
                cadena+="->x" + pivote.hora + ";\n";
            }
            pivote = pivote.abajo;
        }
        return cadena;
    }

    enlazar_columnas(){
        let pivote = this.inicio.columnas;
        let cadena = "";
        if(pivote != null){
            cadena+= "m->y" + pivote.dia + ";\n"; 
        }
        while(pivote.abajo != null){
            cadena+=  "y" + pivote.dia + "->y" + pivote.abajo.dia + ";\n";
            cadena+=  "y" + pivote.abajo.dia + "->y" + pivote.dia + "[rankdir=UD];\n";
            pivote = pivote.abajo;
        }
        return cadena;
    }

    recorrer_filas(){
        let cadena = "";
        let pivote = this.inicio.filas;
        while(pivote != null){
            cadena+="x" + pivote.hora;
            let piv = pivote.der;
            while(piv != null){
                if(piv.der != null){
                    cadena+="->n" + piv.identificador;
                }else{
                    cadena+="->n" + piv.identificador + ";\n";
                    break;
                }
                pov = piv.der;
            }
            cadena+="n" + piv.identificador;
            while(piv != pivote){
                if(piv.izq != pivote){
                    cadena+="->n" + piv.identificador;
                }else{
                    cadena+="->n" + piv.identificador + "->x"+ pivote.hora +";\n";
                    break;
                }
                pov = piv.izq;
            }
            cadena+="\n";
            pivote = pivote.abajo;
        }
    }

    recorrer_columnas(){
        let cadena = "";
        let pivote = this.inicio.filas;
        while(pivote != null){
            let piv = pivote.abajo;
            cadena+="y" + pivote.dia +"->n" + piv.identificador + "[constraint=false];\n";
            cadena+="n" + piv.identificador + "->y" + pivote.dia + "[constraint=false];\n";
            piv =  pivote.abajo;
            while(piv.abajo != null){
                cadena+="n" + pivote.identificador +"->n" + piv.abajo.identificador + "[constraint=false];\n";
                cadena+="n" + piv.abajo.identificador + "->n" + pivote.dia + "[constraint=false];\n";
                pov = piv.der;
            }
            cadena+="\n";
            pivote = pivote.der;
        }
    }
}
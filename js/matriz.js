class nodoMatriz{
    constructor(evento, hora, dia){
        this.evento = evento;
        this.hora =  hora;
        this.dia = dia;
        this.izq = null;
        this.der = null;
        this.arriba = null;
        this.abajo = null;
        this.identificador = 0;
    }
}

class nodoInicio{
    constructor(){
        this.filas = null;
        this.columnas = null;
    }
}

class Matriz{
    constructor(){
        this.inicio = new nodoInicio(); 
        this.contadorNodo = 0;
    }

    insertarFila(nuevo){
        if(this.inicio.filas == null){
            this.inicio.filas = nuevo;
            nuevo.arriba = this.inicio;
            return nuevo;
        }else{
            let pivote = this.inicio.filas;
            if(pivote.hora == nuevo.hora){
                return pivote;
            }
            if(nuevo.hora < pivote.hora){
                nuevo.abajo = pivote;
                pivote.arriba = nuevo;
                this.inicio.filas = nuevo;
                nuevo.arriba = this.inicio;
                return nuevo;
            }else{
                while(pivote.abajo != null){
                    if(nuevo.hora == pivote.abajo.hora){
                        return pivote.abajo;
                    }else if(nuevo.hora < pivote.abajo.hora){
                        nuevo.abajo = pivote.abajo;
                        nuevo.arriba = pivote;
                        pivote.abajo.arriba = nuevo;
                        pivote.abajo = nuevo;
                        return nuevo;
                    }
                    pivote = pivote.abajo;
                }
                if(pivote.hora == nuevo.hora){
                    return pivote;
                }
                pivote.abajo = nuevo;
                nuevo.arriba = pivote;
                return nuevo;
            }
        }
    }

    insertarColumna(nuevo){
        if(this.inicio.columnas == null){
            this.inicio.columnas = nuevo;
            nuevo.izq = this.inicio;
            return nuevo;
        }else{
            let pivote = this.inicio.columnas;
            if(pivote.dia == nuevo.dia){
                return pivote;
            }
            if(nuevo.dia < pivote.dia){
                nuevo.der = pivote;
                pivote.izq = nuevo;
                this.inicio.columnas = nuevo;
                nuevo.izq = this.inicio;
                return nuevo;
            }else{
                while(pivote.der != null){
                    if(nuevo.dia == pivote.der.dia){
                        return pivote.der;
                    }else if(nuevo.dia < pivote.der.dia){
                        nuevo.der = pivote.der;
                        nuevo.izq = pivote;
                        pivote.der.izq = nuevo;
                        pivote.der = nuevo;
                        return nuevo;
                    }
                    pivote = pivote.der;
                }
                if(pivote.dia == nuevo.dia){
                    return pivote;
                }
                pivote.der = nuevo;
                nuevo.izq = pivote;
                return nuevo;
            }
        }
    }

    enlazarFila(fila, nuevo){
        if(fila.der == null){
            fila.der = nuevo;
            nuevo.izq = fila;
            return nuevo;
        }else{
            let pivote = fila.der;
            if(nuevo.dia < pivote.dia){
                nuevo.der = pivote;
                pivote.izq = nuevo;
                fila.der = nuevo;
                nuevo.izq = fila;
                return nuevo;
            }else{
                while(pivote.der != null){
                    if(nuevo.dia < pivote.der.dia){
                        nuevo.der = pivote.der;
                        nuevo.izq = pivote;
                        pivote.der.izq = nuevo;
                        pivote.der = nuevo;
                        return nuevo;
                    }
                    pivote = pivote.der;
                }
                pivote.der = nuevo;
                nuevo.izq = pivote;
                return nuevo;
            }
        }
    }

    enlazarColumna(columna, nuevo){
        if(columna.abajo == null){
            columna.abajo = nuevo;
            nuevo.arriba = columna;
            return nuevo;
        }else{
            let pivote = columna.abajo;
            if(nuevo.hora < pivote.hora){
                nuevo.abajo = pivote;
                pivote.arriba = nuevo;
                columna.abajo = nuevo;
                nuevo.arriba = columna;
                return nuevo;
            }else{
                while(pivote.abajo != null){
                    if(nuevo.hora < pivote.abajo.hora){
                        nuevo.abajo = pivote.abajo;
                        nuevo.arriba = pivote;
                        pivote.abajo.arriba = nuevo;
                        pivote.abajo = nuevo;
                        return nuevo;
                    }
                    pivote = pivote.abajo;
                }
                pivote.abajo = nuevo;
                nuevo.arriba = pivote;
                return nuevo;
            }
        }
    }

    insertar(evento, hora, dia){
        let nuevo = new nodoMatriz(evento, hora, dia);
        let nuevaFila = new nodoMatriz("Fila", hora, 0);
        let nuevaColumna = new nodoMatriz("Columna", 0, dia);
        let nodoHora = this.insertarFila(nuevaFila);
        let nodoDia = this.insertarColumna(nuevaColumna);
        if(this.enlazarFila(nodoHora, nuevo)){
            return this.enlazarColumna(nodoDia, nuevo);
        }else{
            return false;
        }
    }

    graficar(){
        let cadena="digraph matriz {\n";
        cadena+= "rankdir=UD;\n";
        cadena+= "node[shape=box];\n";
        cadena+= "{\n";
        cadena+= "rank=min;\n";
        cadena+= "m[label=\"matriz\"];\n";
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
        return cadena;
    }

    graficar_filas(){
        let pivote = this.inicio.columnas;
        let cadena = "";
        while(pivote != null){
            cadena+="x" + pivote.dia + "[label=\"Hora: " + pivote.dia + "\",rankdir=LR];\n";
            pivote = pivote.der;
        }
        return cadena;
    }

    graficar_columnas(){
        let cadena = "";
        let pivote = this.inicio.filas;
        while(pivote != null){
            cadena+="{\n";
            if(pivote.abajo != null){
                cadena+="rank=same;";
            }else{
                cadena+="rank=max;";
            }
            cadena+="y" + pivote.hora + "[label=\"Dia: " + pivote.hora + "\"];\n";
            let piv = pivote.der;
            while(piv != null){
                piv.identificador = this.contadorNodo;
                this.contadorNodo++;
                cadena+="n" + piv.identificador + "[label=\"" + piv.evento + "\"];\n";
                piv = piv.der;
            }
            cadena+="}\n\n";
            pivote = pivote.abajo;
        }
        return cadena;
    }

    enlazar_filas(){
        let pivote = this.inicio.columnas;
        let cadena = "m";
        while(pivote != null){
            if(pivote.der != null){
                cadena+="->x" + pivote.dia;
            }else{
                cadena+="->x" + pivote.dia + ";\n";
                break;
            }
            pivote = pivote.der;
        }
        return cadena;
    }

    enlazar_columnas(){
        let pivote = this.inicio.filas;
        let cadena = "";
        if(pivote != null){
            cadena+= "m->y" + pivote.hora + ";\n"; 
        }
        while(pivote.abajo != null){
            cadena+=  "y" + pivote.hora + "->y" + pivote.abajo.hora + ";\n";
            cadena+=  "y" + pivote.abajo.hora + "->y" + pivote.hora + "[rankdir=UD];\n";
            pivote = pivote.abajo;
        }
        return cadena;
    }

    recorrer_filas(){
        let cadena = "";
        let pivote = this.inicio.columnas;
        while(pivote != null){
            cadena+="x" + pivote.dia;
            let piv = pivote.abajo;
            while(piv != null){
                if(piv.abajo != null){
                    cadena+="->n" + piv.identificador;
                }else{
                    cadena+="->n" + piv.identificador + ";\n";
                    break;
                }
                piv = piv.abajo;
            }
            cadena+="n" + piv.identificador;
            piv = piv.arriba;
            if(piv == pivote){
                cadena+="->x"+ pivote.dia +";\n";
            }else{
                while(piv != pivote){
                    if(piv.arriba != pivote){
                        cadena+="->n" + piv.identificador;
                    }else{
                        cadena+="->n" + piv.identificador + "->x"+ pivote.dia +";\n";
                        break;
                    }
                    piv = piv.arriba;
                }
            }
            cadena+="\n";
            pivote = pivote.der;
        }
        return cadena;
    }

    recorrer_columnas(){
        let cadena = "";
        let pivote = this.inicio.filas;
        while(pivote != null){
            let piv = pivote.der;
            cadena+="y" + pivote.hora +"->n" + piv.identificador + "[constraint=false];\n";
            cadena+="n" + piv.identificador + "->y" + pivote.hora + "[constraint=false];\n";
            while(piv.der != null){
                cadena+="n" + piv.identificador +"->n" + piv.der.identificador + "[constraint=false];\n";
                cadena+="n" + piv.der.identificador + "->n" + piv.identificador + "[constraint=false];\n";
                piv = piv.der;
            }
            cadena+="\n";
            pivote = pivote.abajo;
        }
        return cadena;
    }
}
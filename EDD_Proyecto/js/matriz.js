export class nodoMatriz{
    constructor(evento, hora, dia){
        this.evento = evento;
        this.hora = hora;
        this.dia = dia;
        this.izq = null;
        this.der = null;
        this.arriba = null;
        this.abajo = null;
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
}
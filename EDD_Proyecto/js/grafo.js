class nodoGrafo{
    constructor(nombre, valorFila, valorColumna, distancia){
        this.nombre = nombre;
        this.distancia = distancia;
        this.valorFila =  valorFila;
        this.valorColumna = valorColumna;
        this.izq = null;
        this.der = null;
        this.arriba = null;
        this.abajo = null;
        this.identificador = 0;
    }
}

class nodoInicioGrafo{
    constructor(){
        this.filas = null;
        this.columnas = null;
    }
}

class Grafo{
    constructor(){
        this.inicio = new nodoInicioGrafo(); 
        this.contadorNodo = 0;
    }

    insertarFila(nuevo){
        if(this.inicio.filas == null){
            this.inicio.filas = nuevo;
            nuevo.arriba = this.inicio;
            return nuevo;
        }else{
            let pivote = this.inicio.filas;
            if(pivote.valorFila == nuevo.valorFila){
                return pivote;
            }
            if(nuevo.valorFila < pivote.valorFila){
                nuevo.abajo = pivote;
                pivote.arriba = nuevo;
                this.inicio.filas = nuevo;
                nuevo.arriba = this.inicio;
                return nuevo;
            }else{
                while(pivote.abajo != null){
                    if(nuevo.valorFila == pivote.abajo.valorFila){
                        return pivote.abajo;
                    }else if(nuevo.valorFila < pivote.abajo.valorFila){
                        nuevo.abajo = pivote.abajo;
                        nuevo.arriba = pivote;
                        pivote.abajo.arriba = nuevo;
                        pivote.abajo = nuevo;
                        return nuevo;
                    }
                    pivote = pivote.abajo;
                }
                if(pivote.valorFila == nuevo.valorFila){
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
            if(pivote.valorColumna == nuevo.valorColumna){
                return pivote;
            }
            if(nuevo.valorColumna < pivote.valorColumna){
                nuevo.der = pivote;
                pivote.izq = nuevo;
                this.inicio.columnas = nuevo;
                nuevo.izq = this.inicio;
                return nuevo;
            }else{
                while(pivote.der != null){
                    if(nuevo.valorColumna == pivote.der.valorColumna){
                        return pivote.der;
                    }else if(nuevo.valorColumna < pivote.der.valorColumna){
                        nuevo.der = pivote.der;
                        nuevo.izq = pivote;
                        pivote.der.izq = nuevo;
                        pivote.der = nuevo;
                        return nuevo;
                    }
                    pivote = pivote.der;
                }
                if(pivote.valorColumna == nuevo.valorColumna){
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
            if(pivote.valorColumna == nuevo.valorColumna){
                return pivote;
            }
            if(nuevo.valorColumna < pivote.valorColumna){
                nuevo.der = pivote;
                pivote.izq = nuevo;
                fila.der = nuevo;
                nuevo.izq = fila;
                return nuevo;
            }else{
                while(pivote.der != null){
                    if(nuevo.valorColumna == pivote.der.valorColumna){
                        return pivote.der;
                    }else if(nuevo.valorColumna < pivote.der.valorColumna){
                        nuevo.der = pivote.der;
                        nuevo.izq = pivote;
                        pivote.der.izq = nuevo;
                        pivote.der = nuevo;
                        return nuevo;
                    }
                    pivote = pivote.der;
                }
                if(pivote.valorColumna == nuevo.valorColumna){
                    return pivote;
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
            if(pivote.valorFila == nuevo.valorFila){
                return pivote;
            }
            if(nuevo.valorFila < pivote.valorFila){
                nuevo.abajo = pivote;
                pivote.arriba = nuevo;
                columna.abajo = nuevo;
                nuevo.arriba = columna;
                return nuevo;
            }else{
                while(pivote.abajo != null){
                    if(nuevo.valorFila == pivote.abajo.valorFila){
                        return pivote.abajo;
                    }else if(nuevo.valorFila < pivote.abajo.valorFila){
                        nuevo.abajo = pivote.abajo;
                        nuevo.arriba = pivote;
                        pivote.abajo.arriba = nuevo;
                        pivote.abajo = nuevo;
                        return nuevo;
                    }
                    pivote = pivote.abajo;
                }
                if(pivote.valorFila == nuevo.valorFila){
                    return pivote;
                }
                pivote.abajo = nuevo;
                nuevo.arriba = pivote;
                return nuevo;
            }
        }
    }

    insertar(nombre, valorFila, valorColumna, distancia){
        let nuevo = new nodoGrafo(nombre, valorFila, valorColumna, distancia);
        let nuevaFila = new nodoGrafo(nombre, valorFila, 0, 0);
        let nuevaColumna = new nodoGrafo(nombre, 0, valorColumna, 0);
        let nodovalorFila = this.insertarFila(nuevaFila);
        let nodovalorColumna = this.insertarColumna(nuevaColumna);
        this.enlazarFila(nodovalorFila, nuevo);
        this.enlazarColumna(nodovalorColumna, nuevo);

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
            cadena+="x" + pivote.valorColumna + "[label=\"valorColumna: " + pivote.nombre + "\",rankdir=LR];\n";
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
            cadena+="y" + pivote.valorFila + "[label=\"valorfila: " + pivote.nombre + "\"];\n";
            let piv = pivote.der;
            while(piv != null){
                piv.identificador = this.contadorNodo;
                this.contadorNodo++;
                cadena+="n" + piv.identificador + "[label=\"" + piv.nombre + "\"];\n";
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
                cadena+="->x" + pivote.valorColumna;
            }else{
                cadena+="->x" + pivote.valorColumna + ";\n";
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
            cadena+= "m->y" + pivote.valorFila + ";\n"; 
        }
        while(pivote.abajo != null){
            cadena+=  "y" + pivote.valorFila + "->y" + pivote.abajo.valorFila + ";\n";
            cadena+=  "y" + pivote.abajo.valorFila + "->y" + pivote.valorFila + "[rankdir=UD];\n";
            pivote = pivote.abajo;
        }
        return cadena;
    }

    recorrer_filas(){
        let cadena = "";
        let pivote = this.inicio.columnas;
        while(pivote != null){
            cadena+="x" + pivote.valorColumna;
            console.log("Recorrido " + pivote.valorColumna);
            console.log(pivote);
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
                cadena+="->x"+ pivote.valorColumna +";\n";
            }else{
                while(piv != pivote){
                    if(piv.arriba != pivote){
                        cadena+="->n" + piv.identificador;
                    }else{
                        cadena+="->n" + piv.identificador + "->x"+ pivote.valorColumna +";\n";
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
            cadena+="y" + pivote.valorFila +"->n" + piv.identificador + "[constraint=false];\n";
            cadena+="n" + piv.identificador + "->y" + pivote.valorFila + "[constraint=false];\n";
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

     // Sin auto-loo
    Dijkstra(matrix, start = 0) {
        console.log(matrix);
        console.log(start);
        let rows = matrix.length, 
        cols = matrix[0].length;

        if (rows !== cols || start >= rows){
            return null;
        } 

        const distance = new Array(rows).fill(Infinity);
        const pre = new Array(rows).fill(-1);
        distance[start] = 0;

        for(let i = 0; i < rows; i++) {
            if(distance[i] < Infinity) {
                for(let j = 0; j < cols; j++) {
                    if(matrix[i][j] + distance[i] < distance[j]) {
                        distance[j] = matrix[i][j] + distance[i];
                        pre[j] = i;
                    }
                }
            }
        }
        return {"distancia": distance, "predecesores":pre};
    }

    prueba(){
        let matrix= [
            [0, 9, 2, Infinity, 3],
            [9, 0, 3, Infinity, Infinity],
            [2, 3, 0, 5, Infinity],
            [Infinity, Infinity, 5, 0, 1],
            [3, Infinity, Infinity, 1, 0]
        ];

        let inicio = 0;
        let calculo = this.Dijkstra(matrix, inicio);
        console.log("Inicio " + inicio);
        let fin = 1;
        let validacion = calculo.predecesores[fin];
        let nuevoInicio = calculo.predecesores[fin];
        console.log("pasando por " + nuevoInicio);

        if(inicio == validacion){
            console.log("Encontrado a " + fin );
        }else{
            while(validacion != -1){
                let calculoRecursiva =  this.Dijkstra(matrix, nuevoInicio);
                validacion = calculoRecursiva.predecesores[fin];
                if(nuevoInicio == validacion){
                    console.log("Encontrado a " + fin );
                    break;
                }else{
                    nuevoInicio = calculoRecursiva.predecesores[fin];
                    console.log("pasando por " + nuevoInicio);
                }
            }
        }
    }

    obtenerMaximo(){
        let pivoteX = this.inicio.filas;
        while(pivoteX.abajo != null){
            pivoteX = pivoteX.abajo;
        }
        return pivoteX.valorFila + 1;
    }

    obtenerMatriz(){
        let mat = [];
        let arreglo = [];
        let pivoteX = this.inicio.filas;
        arreglo = new Array(this.obtenerMaximo()).fill(Infinity);
        mat.push(arreglo);
        while(pivoteX != null){
            let pivoteY = pivoteX.der;
            let tam = this.obtenerMaximo();
            console.log(tam);
            arreglo = new Array(this.obtenerMaximo()).fill(Infinity);
            arreglo[pivoteX.valorFila] = 0;
            while(pivoteY != null){
                arreglo[pivoteY.valorColumna] = pivoteY.distancia;
                pivoteY = pivoteY.der;
            }
            mat.push(arreglo);
            pivoteX = pivoteX.abajo;
        }
        return mat;
    }

    obtenerRutaMinima(inicio, fin){
        let cadena="graph grafo {\n";
        cadena+= "layout=neato;\n";
        let mat = this.obtenerMatriz();
        let calculo  = this.Dijkstra(mat, inicio);
        console.log("Inicio " + inicio);
        let validacion = calculo.predecesores[fin];
        let nuevoInicio = calculo.predecesores[fin];
        let encontrado = false;
        let totalDistancia = 0;
        if(inicio == validacion){
            cadena+= this.obtenerNodoPosicion(inicio)+ "--" + this.obtenerNodoPosicion(fin) + "[label=\"" + calculo.distancia[fin] + "\"];\n";
            totalDistancia+=calculo.distancia[fin];
            encontrado = true;
        }else{
            cadena+= this.obtenerNodoPosicion(inicio)+ "--" + this.obtenerNodoPosicion(nuevoInicio) + "[label=\"" + calculo.distancia[nuevoInicio] + "\"];\n";
            totalDistancia+=calculo.distancia[nuevoInicio];
            while(validacion != -1){
                let calculoRecursiva =  this.Dijkstra(mat, nuevoInicio);
                validacion = calculoRecursiva.predecesores[fin];
                if(nuevoInicio == validacion){
                    cadena+= this.obtenerNodoPosicion(nuevoInicio)+ "--" + this.obtenerNodoPosicion(fin) + "[label=\"" + calculoRecursiva.distancia[fin] + "\"];\n";
                    totalDistancia+=calculoRecursiva.distancia[fin];
                    encontrado = true;
                    break;
                }else{
                    cadena+= this.obtenerNodoPosicion(nuevoInicio)+ "--" + this.obtenerNodoPosicion(calculoRecursiva.predecesores[fin]) + "[label=\"" + calculoRecursiva.distancia[calculoRecursiva.predecesores[fin]] + "\"];\n";
                    totalDistancia+=calculoRecursiva.distancia[calculoRecursiva.predecesores[fin]];
                    nuevoInicio = calculoRecursiva.predecesores[fin];
                }
            }
        }
        cadena+="nTotal[label=\"Total: "+ totalDistancia + "\"];\n"
        cadena+="}\n";
        if(!encontrado){
            cadena="graph grafo {\n";
            cadenad+="n[label=\"Camino no encontrado\"];\n"
            cadena+="}\n";
        }
        return cadena;
    }

    obtenerNodoPosicion(pos){
        let pivoteX = this.inicio.filas;
        while(pivoteX.abajo != null){
            if(pivoteX.valorFila == pos){
                return pivoteX.nombre.replaceAll(' ', '');
            }
            pivoteX = pivoteX.abajo;
        }
        return pivoteX.valorFila;
    }

    graficarGrafo(){
        let cadena="graph grafo {\n";
        cadena+= "layout=neato;\n";
        let pivoteX = this.inicio.filas;
        while(pivoteX != null){
            let pivoteY = pivoteX.der;
            while(pivoteY != null){
                if(pivoteX.valorFila < pivoteY.valorColumna){
                    cadena+= pivoteX.nombre.replaceAll(' ', '') + "--" + pivoteY.nombre.replaceAll(' ', '') + "[label=\"" + pivoteY.distancia + "\"];\n";
                }
                pivoteY = pivoteY.der;
            }
            pivoteX = pivoteX.abajo;
        }
        cadena+="}\n";
        return cadena;
    }

}
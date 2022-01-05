class bloque{
    constructor(indice,data,previusHash){
        this.indice = indice;
        this.data = data;
        this.fecha = Date.now();
        this.previusHash = previusHash;
        this.hash = this.crearHash();
        this.nonce =0;
        this.prueba_de_trabajo(3);
    }

    crearHash(){
      //usar libreria
      var hash = CryptoJS.HmacSHA256(this.indice+this.fecha+this.previusHash+this.data+this.nonce, "secret");
      var hashInHex = CryptoJS.enc.Hex.stringify(hash);
      return hashInHex;
    }

    prueba_de_trabajo(dificultad){
      while(this.hash.substring(0,dificultad) !== Array(dificultad+1).join("0")){
        this.nonce++;
        this.hash = this.crearHash();
        //console.log("->nonce " +this.nonce);
      }
      //console.log(this.hash);
      return this.hash;
    }
}

class BlockChain{
  constructor(){
    this.indice=0;
    this.bloques =[];
  }

  agregar(data){
    let previusHash='0000';
    if(this.indice!=0){
        previusHash=this.cadena[this.indice-1].hash;
    }
    let nuevo = new bloque(this.indice,data,previusHash);
    this.indice++;
    this.bloques.push(nuevo);
  }

  Graficar(){
    console.log(this.bloques);
    let grafica = "digraph Tabla{";
    grafica += "\r\n";
    grafica += "node[shape=plaintext];";
    grafica += "\r\n";
    grafica += "node1[label=<";
    grafica += "\r\n";
    grafica += "<TABLE BORDER=\"0\" CELLBORDER=\"1\" CELLSPACING=\"0\" CELLPADDING=\"4\">";
    for(let item of this.bloques){
        grafica += "<TR>";
        grafica += "<TD>";
        grafica += item.indice;
        grafica += "</TD>";
        grafica += "<TD>";
        grafica += item.fecha;
        grafica += "</TD>";
        grafica += "<TD>";
        grafica += item.data;
        grafica += "</TD>";
        grafica += "<TD>";
        grafica += item.nonce;
        grafica += "</TD>";
        grafica += "<TD>";
        grafica += item.previusHash;
        grafica += "</TD>";
        grafica += "<TD>";
        grafica += item.hash;
        grafica += "</TD>";
        grafica += "</TR>";
    }
    grafica += "</TABLE>";
    grafica += ">];";
    grafica +="\r\n";
    grafica += "}";
    console.log(grafica);
  }
  
}
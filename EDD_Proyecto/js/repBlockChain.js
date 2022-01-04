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
      var hash = CryptoJS.HmacSHA256(this.indice+this.data+this.fecha+this.previusHash+this.nonce, "secret");
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

class cadena{
  constructor(){
    this.indice=0;
    this.cadena =[];
    this.cadena.push(this.Bloque_genesis());
  }

  Bloque_genesis(){
    let genesis = new bloque(this.indice,"bloque Genesis","");
    this.indice++;
    return genesis;
  }

  agregar(data){
    let nuevo = new bloque(this.indice,data,this.cadena[this.indice-1].hash);
    this.indice++;
    this.cadena.push(nuevo);
  }

  recorrer(){
    for(let item of this.cadena){
      console.log(item);
    }
  }
  
}

let vendedores = new avl();
let proveedores = new abb();
let usuario = new nodoAvl();
let inventario = new arbolB();
let rutas = new Grafo();
let ventas = new TablaHash();

function inicializar_listas(){
    console.log("Entro a inicializar listas ");
    var tem_vendedores = JSON.parse(sessionStorage.getItem("vendedores"));
    vendedores = new avl();
    tem_vendedores = CircularJSON.parse(tem_vendedores);
    Object.assign(vendedores,tem_vendedores);

    var tem_proveedores = JSON.parse(sessionStorage.getItem("proveedores"));
    proveedores = new abb();
    tem_proveedores = CircularJSON.parse(tem_proveedores);
    Object.assign(proveedores,tem_proveedores);

    var tem_inventario = JSON.parse(sessionStorage.getItem("inventario"));
    inventario = new arbolB();
    tem_inventario = CircularJSON.parse(tem_inventario);
    Object.assign(inventario,tem_inventario);

    var tem_rutas = JSON.parse(sessionStorage.getItem("rutas"));
    rutas = new Grafo();
    tem_rutas = CircularJSON.parse(tem_rutas);
    Object.assign(rutas,tem_rutas);

    var tem_usuarios = JSON.parse(sessionStorage.getItem("usuario"));
    usuario = new nodoAvl();
    tem_usuarios = CircularJSON.parse(tem_usuarios);
    Object.assign(usuario,tem_usuarios);

    var tem_ventas = JSON.parse(sessionStorage.getItem("ventas"));
    ventas = new TablaHash();
    tem_ventas = CircularJSON.parse(tem_ventas);
    Object.assign(ventas,tem_ventas);

    if(usuario.id == undefined || usuario.id == NaN){
        location.href="../login.html";
    }

    let blockChain = new cadena();

    let info=[]

    let nueva_venta = {
    "id":3,
    "vendedor":"vendedor3",
    "cliente":"cliente1",
    "productos":[
        {
        "id":1,
        "cantidad":3
        }
    ]
    };
    info.push(nueva_venta)

    info.push({
    "id":1,
    "vendedor":"vendedor1",
    "cliente":"cliente1",
    "productos":[
        {
        "id":1,
        "cantidad":3
        }
    ]
    }
    )
    //console.log(blockChain.cadena);
    blockChain.agregar(JSON.stringify(info));
    info =[];
    blockChain.agregar(JSON.stringify(info));
    blockChain.recorrer();
}

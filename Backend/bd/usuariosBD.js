const usuariosBD=require("./conexion").usuarios;
const Usuario = require("../clases/UsuarioClase");
const {encriptarPassword, validarPassword} = require("../middlewares/funcionesPassword")

function validarDatos(usuario2){
    var datosCorrectos = false;
    if(usuario2.nombre!=undefined && usuario2.usuario!= undefined && usuario2.password!= undefined){
        datosCorrectos = true;
    }
    return datosCorrectos;
}

async function mostrarUsuarios(){
    const usuarios=await usuariosBD.get();
    //console.log(usuarios);
    var usuariosValidos=[];
    usuarios.forEach(usuario => {
        //console.log(usuario.id);
        const usuario1= new  Usuario({id:usuario.id,...usuario.data()});
        const usuario2 = usuario1.getUsuario;        
        if(validarDatos(usuario2)){
            usuariosValidos.push(usuario2);
        }    
    });
    //console.log (usuariosValidos); 
    return usuariosValidos;
}
async function buscarPorId(id){
const usuario=await usuariosBD.doc(id).get();
const usuario1=new Usuario({id:usuario.id,...usuario.data()}); 
var usuariosValido={error:true};
if(validarDatos(usuario1.getUsuario)){
    usuariosValido = usuario1.getUsuario

}
//console.log(usuariosValido);
return usuariosValido

}

async function nuevoUsuario(data){
    const {salt,hash} = encriptarPassword(data.password);
    data.password = hash;
    data.salt = salt;
    data.tipoUsuario="usuario";
    const usuario1 = new Usuario(data);
    //console.log(usuario1.getusuario);
    var usuariosValido=false;
    if(validarDatos(usuario1.getUsuario)){
        await usuariosBD.doc().set(usuario1.getUsuario)
        usuarioValido=true;
    }
    return usuarioValido;

}

async function borrarUsuario(id){
const usuario= await buscarPorId(id);
var borrado = false; 
if(usuario.error!=true){
    await usuariosBD.doc(id).delete();
    borrado = true;
}
//console.log(usuario);
return borrado;
} 

async function modificarUsuario(id, data) {
    const usuarioExistente = await buscarPorId(id);
    var modificado = false;
    if (usuarioExistente.error != true) {
        if (data.password) {
            const { salt, hash } = encriptarPassword(data.password);
            data.password = hash;
            data.salt = salt;
        }
        await usuariosBD.doc(id).update(data);
        modificado = true;
    }
    return modificado;
}



module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorId, 
    modificarUsuario
}

//borrarUsuario("100");
//borrarUsuario("tW10xvFSKbqVT0LRmXTp");
//borrarUsuario("0b2lnbfgpNAxDB6toLbw");
 

/*data={
    nombre:"Benito Juarez",
    usuario:"benito",
    password:"abc"
}

nuevoUsuario(data);
*/


//buscarPorId("100");
//buscarPorId("tW10xvFSKbqVT0LRmXTp");
//mostrarUsuarios();
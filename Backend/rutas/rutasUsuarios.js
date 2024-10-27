var ruta = require("express").Router();//nombre que quiera a la variable
//var {Router} = require("express"); //aqui esta la estructuracion llamando a una funcion Router
var {mostrarUsuarios,nuevoUsuario,borrarUsuario,buscarPorId,modificarUsuario}=require("../bd/usuariosBD");

ruta.get("/",async(req,res)=>{
    //res.send("hola estas en la raiz");
    const usuarios=await mostrarUsuarios();
    //console.log(usuarios);
    res.json(usuarios);
});
ruta.get("/buscarPorId/:id",async(req,res)=>{
    var usuariosValido=await buscarPorId(req.params.id);
    res.json(usuariosValido);
});

ruta.delete("/borrarUsuario/:id",async(req,res)=>{
    var borrado=await borrarUsuario(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoUsuario", async(req,res)=>{
    var usuariosValido = await nuevoUsuario(req.body);
    res.json(usuariosValido);
})

ruta.put("/modificarUsuario/:id", async (req, res) => {
    const modificado = await modificarUsuario(req.params.id, req.body);
    res.json(modificado);
});

module.exports=ruta;
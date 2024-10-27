"use client"
import axios from "axios";

async function guardarVenta(e) {
    e.preventDefault();
    console.log("Estas en guardarVenta");

    const url = "http://localhost:3000/ventas/nuevaVenta";
    const datos = {
        cantidad: parseInt(document.getElementById("cantidad").value), 
        fecha: document.getElementById("fecha").value, 
        hora: document.getElementById("hora").value, 
        idProducto: document.getElementById("idProducto").value,
        idUsuario: document.getElementById("idUsuario").value, 
        status: document.getElementById("status").value 
    };

    try {
        const respuesta = await axios.post(url, datos);
        console.log(respuesta.data); 

        window.location.href = "http://localhost:3001/ventas/mostrar"; 
    } catch (error) {
        console.error("Error al guardar la venta:", error); 
    }
}

export default function NuevaVenta() {
    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={guardarVenta} className="col-6 mt-5" action="" method="post">
                <div className="card">
                    <div className="card-header">
                        <h1>Nueva Venta</h1>
                    </div>
                    <div className="card-body">
                        <input placeholder="Cantidad" className="form-control mb-3" id="cantidad" type="number" min="1" required />
                        <input placeholder="Fecha" className="form-control mb-3" id="fecha" type="date" required />
                        <input placeholder="Hora" className="form-control mb-3" id="hora" type="time" required />
                        <input placeholder="ID Producto" className="form-control mb-3" id="idProducto" type="text" required />
                        <input placeholder="ID Usuario" className="form-control mb-3" id="idUsuario" type="text" required />
                        <input placeholder="Status" className="form-control mb-3" id="status" type="text" required />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary col-12">Guardar nueva venta</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

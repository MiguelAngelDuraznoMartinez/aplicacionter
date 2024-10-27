import BorrarVenta from "@/components/borrarv"; 
import axios from "axios";

async function getVentas() {
    const url = "http://localhost:3000/ventas";
    const ventas = await axios.get(url);
    return ventas.data;
}

export default async function Ventas() {
    const ventas = await getVentas();
    return (
        <>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>ID Producto</th>
                        <th>ID Usuario</th>
                        <th>Status</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ventas.map((venta, i) => (
                            <tr key={i}>
                                <td>{venta.id}</td>
                                <td>{venta.cantidad}</td>
                                <td>{venta.fecha}</td>
                                <td>{venta.hora}</td>
                                <td>{venta.idProducto}</td>
                                <td>{venta.idUsuario}</td>
                                <td>{venta.status}</td>
                                <td>
                                    <BorrarVenta id={venta.id} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}

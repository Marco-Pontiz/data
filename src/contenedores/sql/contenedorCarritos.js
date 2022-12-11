import ContenedorBase from "./contenedorBase.js";
import knex from "knex";
import { options } from "../../config/configDB.js";
const db = knex(options.mysql);

class ContenedorCarritos extends ContenedorBase {
  constructor() {
    super("carritos");
  }

  async agregarProducto(idCarrito, idProducto) {
    try {
      await db("carritos_productos").insert({
        carrito_id: idCarrito,
        producto_id: idProducto,
      });
    } catch (error) {
      return error.message;
    }
  }

  async borrarProducto(idCarrito, idProducto) {
    try {
      await db("carritos_productos")
        .where("carrito_id", idCarrito)
        .andWhere("producto_id", idProducto)
        .del();
        return borrarProducto;
        
    } catch (error) {
      return error.message;
    }
  }

  async listarProductosDelCarrito(idCarrito) {
    try {
      const productos = await db("carritos_productos")
        .select("producto_id")
        .where("carrito_id", idCarrito)
        .join("productos", "carritos_productos.producto_id", "productos.id")
        .select("productos.*");
      return productos;
    } catch (error) {
      return error.message;
    }
  }
}

export default ContenedorCarritos;
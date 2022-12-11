import knex from "knex";
import { options } from "../../config/configDB.js";
const db = knex(options.mysql);

class ContenedorBase {
  constructor(table) {
    this.table = table;
  }
  async getAll() {
    try {
      const items = await db(this.table).select("*");
      return items;
    } 
    
    catch (error) {
      return error.message;
    }
  }
  async getById(id) {
    try {
      const getById = await db(this.table).select("*").where("id", id);
      return getById;
    } catch (error) {
      return error.message;
    }
  }
  async create(body) {
    try {
      const new_product_id = await db(this.table).insert(body);
      const new_product = await db(this.table).select("*").where("id", new_product_id);
      return new_product;
    } catch (error) {
      return error.message;
    }
  }
  async update(id, body) {
    try {
      const { nombre, codigo, precio} = body;
      await db(this.table).where("id", id).update({
        nombre,
        codigo,
        precio,
        });
      const updated_product = this.getOne(id);
      return updated_product;

    } catch (error) {
      return error.message;
    }
  }
  async deleteById(id) {
    try {
      if (productoBorrado > 0) {
        await db(this.table).where("id", id).del();
      } else {
        console.log(`Producto ${id} no existe.`);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default ContenedorBase;

import { Router } from "express";
const router = Router();
import ContenedorProductos from "../contenedores/sql/contenedorProductos.js";
const contenedor = new ContenedorProductos();


router.get("/", async (req, res) => {
  try {
    const productos = await contenedor.getAll();
    productos
      ? res.status(200).json(productos)
      : res.status(404).json({ message: "No hay productos disponibles" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const producto = await contenedor.getOne(req.params.id);
    if(producto.length > 0) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado: id "  + req.params.id });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevoProducto = await contenedor.create(req.body);
    res.status(201).json({
      message: "Producto creado con éxito",
      producto: nuevoProducto,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productoActualizado = await contenedor.update(
      req.params.id,
      req.body
    );

    res.status(200).json({
      message: "Producto actualizado con éxito",
      producto: productoActualizado,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const fueBorrado = await contenedor.deleteById(req.params.id);
    fueBorrado
      ? res.status(200).json({ message: "Producto borrado con éxito", id: req.params.id })
      : res.status(404).json({ message: "Producto no encontrado: id "  + req.params.id });
    
  } catch (err) {
    return err.message;
  }
});

export default router;

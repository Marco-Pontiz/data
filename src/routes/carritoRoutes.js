import { Router } from "express";
const router = Router();
import ContenedorCarritos from "../contenedores/sql/contenedorCarritos.js";
const contenedor = new ContenedorCarritos();

router.get("/", async (req, res) => {
  try {
    const carritos = await contenedor.getAll();
    carritos
      ? res.status(200).json(carritos)
      : res.status(404).json({ message: "No hay carritos disponibles" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const carrito = await contenedor.getOne(req.params.id);
    carrito
      ? res.status(200).json(carrito)
      : res
          .status(404)
          .json({ message: "Carrito no encontrado. id: " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevoCarrito = await contenedor.create(req.body);
    res.status(201).json({
      message: "Carrito creado con éxito",
      carrito: nuevoCarrito,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const carrito = await contenedor.getOne(req.params.id);
    if (carrito) {
      const carritoDeleted = await contenedor.deleteById(req.params.id);
      res.status(200).json({
        message: "Carrito eliminado con éxito",
        carrito: carritoDeleted,
      });
    } else {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:idCarrito/productos/:idProducto", async (req, res) => {
  try {
    const idCarrito = req.params.idCarrito;
    const idProducto = req.params.idProducto;
    const carrito = await contenedor.getOne(idCarrito);
    const producto = await contenedor.getOne(idProducto);
    if (idCarrito && idProducto) {
      await contenedor.agregarProducto(idCarrito, idProducto);

      res.status(201).json({
        message: "Producto agregados con éxito",
        carrito: idCarrito,
        producto: idProducto,
      });
    }
    if (!carrito) {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
    if (!producto) {
      res.status(404).json({ message: "La lista de productos está vacía" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
});

router.delete("/:idCarrito/productos/:idProducto", async (req, res) => {
  try {
    const idCarrito = req.params.idCarrito;
    const idProducto = req.params.idProducto;
    const carrito = await contenedor.getOne(idCarrito);
    const producto = await contenedor.getOne(idProducto);
    if (idCarrito && idProducto) {
      await contenedor.borrarProducto(idCarrito, idProducto);

      res.status(200).json({
        message: "Producto eliminado con éxito",
        carrito: idCarrito,
        producto: idProducto,
      });
    }
    if (!carrito) {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
    if (!producto) {
      res.status(404).json({ message: "La lista de productos está vacía" });
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
});


router.get("/:id/productos", async (req, res) => {
  try {
    const carrito = await contenedor.getOne(req.params.id);
    if(carrito){
      const productos = await contenedor.listarProductosDelCarrito(req.params.id);
      res.status(200).json(productos);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

import { Router } from "express";
import productosRouter from "./productoRoutes.js";
import carritosRouter from "./carritoRoutes.js";

const apiRouter = Router();

apiRouter.use("/productos", productosRouter);
apiRouter.use("/carritos", carritosRouter);

export default apiRouter;
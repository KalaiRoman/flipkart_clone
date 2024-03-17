import express from 'express';
import { CreateProduct, deleteProduct, editProduct, getAllProduct, getCurrentuserProducts, getProduct } from './ProductControll.js';
import { verifyToken } from '../../../Middleware/Tokenverification.js';
const productrouter = express.Router();
productrouter.post("/create", verifyToken, CreateProduct)
productrouter.get("/getsingle/:id", verifyToken, getProduct)
productrouter.get("/getall", getAllProduct)
productrouter.get("/getuser/products", verifyToken, getCurrentuserProducts)
productrouter.put("/update/:id", verifyToken, editProduct)
productrouter.delete("/delete/:id", verifyToken, deleteProduct)
export default productrouter;
import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderCrop.controller.js";

const router = express.Router();

router.post("/cropOrders", createOrder); //for user to create an order
router.get("/cropOrders", getAllOrders); //for admin to get all orders
router.get("/cropOrders/:id", getOrderById); //for user to get all his orders
router.put("/cropOrders/:id", updateOrder); //for user to update his order
router.delete("/cropOrders/:id", deleteOrder); //for user to delete his order

export default router;

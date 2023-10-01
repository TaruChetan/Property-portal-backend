import express from "express";
import PropertyController from "../controllers/propertyController.js";
import AdminController from "../controllers/adminController.js";
import UserController from "../controllers/userController.js";
const router = express.Router();

router.get("/list-properties", PropertyController.getAllProperties);
router.get("/list-properties", PropertyController.getAllProperties);

router.post("/admin-registration", AdminController.adminRegistration);
router.post("/admin-login", AdminController.adminLogin);

router.post("/user-registration", UserController.userRegistration);
router.post("/user-login", UserController.userLogin);

router.post("/add-property", PropertyController.addProperty);
router.delete("/delete-property/:id", PropertyController.deleteProperty);
router.put("/update-property/:id", PropertyController.updateProperty);
export default router;

import express from "express";
import PropertyController from "../controllers/propertyController.js";
import AdminController from "../controllers/adminController.js";
import UserController from "../controllers/userController.js";
import InfoController from "../controllers/infoController.js";
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





router.post("/contact-details", InfoController.contactInfo);
router.post("/calculate-EMI", InfoController.calculateEMI);
router.post("/add-to-favourite", InfoController.addToFavourite);
router.get("/my-favourites/:userId", InfoController.viewFavourite);
router.delete("/delete-favourites", InfoController.deleteFavourite);

export default router;

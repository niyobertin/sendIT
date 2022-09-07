import express from "express";
import parcelsControllers from "../controllers/parcels.controllers.js";
import usersControllers from "../controllers/users.controlers.js"
const router = express.Router();
//parcels routes
router.get('/parcels', parcelsControllers.getParcels);
router.get("/parcels/:id", parcelsControllers.getParcel);
router.post("/parcels", parcelsControllers.addParcel);
router.put("/parcels/:id", parcelsControllers.cancelparcel);
router.put("/parcels/cangedestination/:id", parcelsControllers.changeDestination);
//user routes 
router.get('/users', usersControllers.getUsers);
router.get('/users/:userId/parcels', usersControllers.getUserParcels)
router.post("/users", usersControllers.addUsers);


export default router;
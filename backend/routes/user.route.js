import express from "express";
import { getSuggestedConnections, getPublicProfile, updateProfile, getCollaborators } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router(); // create a new router 

router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/collaborators", protectRoute, getCollaborators);
router.get("/:username", protectRoute, getPublicProfile);


router.put("/profile", protectRoute, updateProfile);

export default router;
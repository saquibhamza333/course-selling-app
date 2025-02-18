import { Router } from "express"
import { signin, signup } from "../controllers/user.controller.js";
import { validateSignin, validateSignup } from "../middleware/validation.middleware.js";

const router = Router();

router.post('/signup',validateSignup,signup);
router.post('/signin',validateSignin,signin);

export default router;
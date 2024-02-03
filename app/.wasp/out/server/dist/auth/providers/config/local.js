import { Router } from "express";
import login from "../local/login.js";
import signup from "../local/signup.js";
const config = {
    id: "local",
    displayName: "Username and password",
    createRouter() {
        const router = Router();
        router.post('/login', login);
        router.post('/signup', signup);
        return router;
    },
};
export default config;
//# sourceMappingURL=local.js.map
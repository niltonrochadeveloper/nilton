const { Router } = require("express");
const { userController } = require("../../controllers/user");
const { verifyToken } = require("../../helpers/verifyToken");

const router = Router();

router.get("/", verifyToken, userController.users);
router.get("/:email", verifyToken, userController.findUser);
router.post("/create", userController.create);
router.delete("/delete/:email", verifyToken, userController.remove);
router.patch("/update/:email", verifyToken, userController.update);

module.exports = router;

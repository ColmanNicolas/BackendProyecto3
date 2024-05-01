const express = require("express");
const router = express.Router();

const menuController = require("../controllers/menuController");

router.get("/menu", menuController.getAllMenu);

router.post("/menu", menuController.createNewMenu);

router.get("/menu/:id", menuController.getOneMenu);

router.get('/menu/search/:query', menuController.searchMenus);

router.put("/menu/:id", menuController.putUpdateMenu);

router.delete("/menu/:id", menuController.deleteMenu);

router.get('/menu/filter/:filtro', menuController.filtrarMenus);

module.exports = router;
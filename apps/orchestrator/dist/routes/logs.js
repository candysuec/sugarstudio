"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logController_1 = require("../controllers/logController");
var router = (0, express_1.Router)();
router.get('/', logController_1.getLogs);
exports.default = router;

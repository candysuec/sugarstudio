"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var healthController_1 = require("../controllers/healthController");
var router = (0, express_1.Router)();
router.get('/', healthController_1.getHealthStatus);
exports.default = router;

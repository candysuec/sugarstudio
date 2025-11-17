"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var taskController_1 = require("../controllers/taskController");
var router = (0, express_1.Router)();
router.post('/', taskController_1.createTask);
router.get('/', taskController_1.getTasks);
router.post('/generate-sop', taskController_1.generateSOP);
exports.default = router;

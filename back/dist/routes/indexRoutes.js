"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = require("./userRoutes");
const appointmentRoutes_1 = require("./appointmentRoutes");
const router = (0, express_1.Router)();
router.use('/users', userRoutes_1.userRouter);
router.use('/appointments', appointmentRoutes_1.appointmentRouter);
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const ai_1 = require("../lib/ai");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { platform, topic, tone, additionalInstructions } = req.body;
        const content = yield (0, ai_1.generateCreativeContent)(platform, topic, tone, additionalInstructions);
        res.json({ content });
    }
    catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;

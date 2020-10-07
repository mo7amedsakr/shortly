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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uniqid_1 = __importDefault(require("uniqid"));
const typeorm_1 = require("typeorm");
const Url_1 = require("./entity/Url");
const app = express_1.default();
app.use(cors_1.default());
app.options('*', cors_1.default());
app.use(express_1.default.json());
const urlRepo = typeorm_1.getRepository(Url_1.Url);
app.post('/api/url', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUrl = new Url_1.Url();
    newUrl.slug = uniqid_1.default();
    newUrl.url = req.body.url;
    const url = yield urlRepo.save(newUrl);
    console.log(url);
    res.status(200).json({
        url,
    });
}));
exports.default = app;

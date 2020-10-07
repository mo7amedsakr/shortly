"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.Url = void 0;
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const uniqid_1 = __importDefault(require("uniqid"));
process.on('uncaughtException', (err) => {
    console.log('UNCAUGH EXCEPTION! SHUTTING DOWN......');
    console.log(err.name, err.message);
    process.exit(1);
});
dotenv_1.default.config({ path: './.env' });
const isUrl = (url) => {
    const urlregx = new RegExp('^https?:\\/\\/' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return urlregx.test(url);
};
let Url = class Url {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Url.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Url.prototype, "url", void 0);
Url = __decorate([
    typeorm_1.Entity()
], Url);
exports.Url = Url;
typeorm_1.createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    // synchronize: true,
    logging: false,
    entities: [Url],
    ssl: {
        rejectUnauthorized: false,
    },
})
    .then((connection) => {
    console.log('DATABASE CONNECTED!!');
    const app = express_1.default();
    app.use(cors_1.default());
    app.options('*', cors_1.default());
    app.use(express_1.default.json());
    const urlRepo = typeorm_1.getRepository(Url);
    app.post('/api/url', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!isUrl(req.body.url)) {
            return res.status(400).json({
                error: 'Invalid Url.',
            });
        }
        const newUrl = new Url();
        newUrl.slug = uniqid_1.default();
        newUrl.url = req.body.url;
        try {
            const url = yield urlRepo.save(newUrl);
            res.status(201).json({
                url: `${req.protocol}://${req.hostname}/${url.slug}`,
            });
        }
        catch (error) {
            res.status(500).json({
                error: 'Something went wrong!',
            });
        }
    }));
    app.get('/:slug', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const url = yield urlRepo.findOne({ slug: req.params.slug });
            if (!url) {
                throw new Error('Url not found.');
            }
            res.status(301).redirect(url.url);
        }
        catch (error) {
            res.status(404).json({
                error: error.message,
            });
        }
    }));
    const port = process.env.PORT || 4000;
    const server = app.listen(port, () => {
        console.log(`App running on http://127.0.0.1:${port}`);
    });
    process.on('unhandledRejection', (err) => {
        console.log('UNHANDLER REJECTION! SHUTTING DOWN......');
        console.log(err.name, err.message);
        server.close(() => {
            process.exit(1);
        });
    });
    process.on('SIGTERM', () => {
        console.log('SIGTERM RECEIVED. Shutting down gracefully');
        server.close(() => {
            console.log('Process terminated!');
        });
    });
})
    .catch(console.error);

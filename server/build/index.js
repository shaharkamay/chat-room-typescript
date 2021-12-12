"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const url = config_1.default.mongo.url;
mongoose_1.default
    .connect(url, config_1.default.mongo.options)
    .then(() => {
    console.log(`connected to MongoDB`);
    app_1.default.listen(config_1.default.server.port, () => console.log(`app listening at http://localhost:${config_1.default.server.port}`));
})
    .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
});

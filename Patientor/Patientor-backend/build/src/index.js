"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesRoutes_1 = __importDefault(require("./routes/diagnosesRoutes"));
const patientRouter_1 = __importDefault(require("./routes/patientRouter"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(express_1.default.json());
const PORT = 3001;
app.use(cors_1.default());
app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/diagnoses', diagnosesRoutes_1.default);
app.use('/api/patients', patientRouter_1.default);
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

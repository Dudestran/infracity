import express from "express";
import cors from "cors";
import connectdb from "./utils/db.js";
import { urlencoded } from "express";
import dotenv from "dotenv";
import consignorRoute from "./routes/consignor.routes.js";
import consignmentRoute from "./routes/consignment.routes.js";
import session from "express-session";
import authRoute from "./routes/auth.routes.js"
import roleRoute from "./routes/roleRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
    session({
        secret: "logistics-secret-key",
        resave: false,
        saveUninitialized: false,

        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

app.use("/api/consignors", consignorRoute);
app.use("/api/consignments", consignmentRoute);
app.use("/api/auth", authRoute );  
app.use("/api/roles", roleRoute);
const PORT= 5000;
const startServer = async () => {
    try {
        await connectdb();

        app.listen(PORT, () => {
            console.log(`Server listening at port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
};

startServer();
const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./data/db");
const errerCatcher = require("./middlewares/error-catcher");
const logger = require("./helpers/logger");
const path = require("path");
const { limiter: limiterConf } = require("./constants/config");
const startProcess = require("./middlewares/start-process");

app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE"
}));

app.use(express.json());

app.use("/images", express.static(path.join(process.cwd(), "public/images")));

const routes = require("./restAPI/index");
app.use(routes);

const unknownRoute = require("./restAPI/home/unknownRoute/index");
app.use(unknownRoute);

(async () => {
    await sequelize.sync({ alter: true });

    await startProcess();

    if (limiterConf.access.toString() === "true") {
        logger.info("Limiter aktif.");
        const limiter = require("./middlewares/limiter");
        app.use(limiter);
    }

    app.listen(4000, () => {
        logger.info("API çalışmakta", { code: 1 });
    });
})();

app.use(errerCatcher);

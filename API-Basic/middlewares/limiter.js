const rateLimit = require("express-rate-limit");
const { limiter: limiterConf } = require("../constants/config");

const limiter = rateLimit({
    windowMs: limiterConf.windowMs,
    max: limiterConf.max,
    handler: (req, res, next) => {
        res.status(429).send({
            message: "Sistemde yoğunluk vardır. Lütfen birazdan tekrar deneyin."
        });
    }
});

module.exports = limiter;

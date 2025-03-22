require("dotenv").config();

const config = {
    environment: process.env.NODE_ENV || "development",

    token: {
        JWT_KEY: "XNlrtWLq8TC4Gf4LMHGHcszql6sIwU78",
        expire: 4 // hour
    },

    email: {
        service: process.env.EMAIL_SERVICE,
        username: "devtest.mer@gmail.com",
        password: "",
        access: process.env.EMAIL_ACCESS || false
    },

    limiter: {
        windowMs: process.env.LIMIT_WINDOW_MN * 60 * 1000 || 2 * 60 * 1000,
        max: process.env.LIMIT_MAX || 50,
        access: process.env.LIMITER_ACCESS || true
    }
};

module.exports = config;

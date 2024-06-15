const {createUser,loginUser} = require("../controllers/users.controller")

module.exports = (app) => {
    app.post("/api/users/register/", createUser);
    app.post("/api/users/login/", loginUser);
}
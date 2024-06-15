const {authentificate} = require("../config/jwt.config");
const { getAllPirates, getOnePirate, createPirate, deletePirate, editPirate } = require("../controllers/pirates.controller");

module.exports = (app) => {
    app.get('/api/pirates/', authentificate, getAllPirates);
    app.get('/api/pirates/:id/', authentificate, getOnePirate);
    app.post('/api/pirates/', authentificate, createPirate);
    app.delete('/api/pirates/:id/', authentificate, deletePirate);
    app.patch('/api/pirates/:id/', authentificate, editPirate);
}
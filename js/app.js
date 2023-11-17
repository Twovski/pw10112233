import express from "express";
import {createConnection} from "mysql";

const app = express();
app.use(express.json());

const port = "3000";
const conection = createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "pw1011"
});

conection.connect((error) => {
    if(error)return console.error(error);
    console.log("Connect Database");
});

app.get('/', (req, res) => {
    res.send("<h1>Welcome with nodemon!<h1>");
});

app.get("/api/alumnos", (req, res) => {
    conection.query(
        `SELECT * 
        FROM Alumnos`, 
        (err, results) => {
        if(err) return res.status(err).json;
        res.send(results);
    });
});

app.get("/api/alumnos/:id", (req, res) => {
    conection.query(`
    SELECT * 
    FROM Alumnos 
    WHERE NControl = ?`, 
    [req.params.id], (err, results) => {
        if(err) return res.status(err).json;
        res.send(results);
    });
});

app.post("/api/alumnos", (req, res) => {
    const {nc, nm, car, est} = req.body;
    const data = {
        NControl: nc,
        Nombre: nm,
        Carrera: car,
        Estatus: est
    };

    conection.query(`INSERT INTO Alumnos SET ?`, data, (err, results) => {
        if(err) return res.status(err).json
        res.send(results)
    });
});

app.put("/api/alumnos/:id", (req, res) => {
    const {id: nc} = req.params;
    const {nm, car, est} = req.body;

    conection.query(`
        UPDATE Alumnos 
        SET Nombre = ?, Carrera = ?, Estatus = ? 
        WHERE NControl = ?
    `, [nm, car, est, nc], (err, results) => {
        if(err) return res.status(err).json
        res.send(results)
    });
});

app.delete("/api/alumnos/:id", (req, res) => {
    conection.query(`
        DELETE FROM Alumnos 
        WHERE NControl = ?
    `, [req.params.id], (err, results) => {
        if(err) return res.status(err).json
        res.send(results)
    });
})

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
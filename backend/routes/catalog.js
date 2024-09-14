const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();
const verifyToken = require("../middlewares/verify-token");

router.get("/", (req, res) => {
  const db = new sqlite3.Database("./db.sqlite");
  db.serialize(() => {
    db.all("SELECT * FROM catalog_items", [], (err, rows) => {
      res.json(rows);
    });
  });
  db.close();
});

router.post("/", verifyToken, (req, res) => {
  const db = new sqlite3.Database("./db.sqlite");
  const { name, description, imageUrl } = req.body;
  db.serialize(() => {
    const stmt = db.prepare(
      "INSERT INTO catalog_items (name, description, image_url) VALUES (?, ?, ?)"
    );
    stmt.run(name, description, imageUrl);
    stmt.finalize();
    res.json({ status: "success" });
  });
  db.close();
});

router.delete("/:id", verifyToken, (req, res) => {
  const db = new sqlite3.Database("./db.sqlite");
  const { id } = req.params;
  db.serialize(() => {
    const stmt = db.prepare("DELETE FROM catalog_items WHERE id = (?)");
    stmt.run(id);
    stmt.finalize();
    res.json({ status: "success" });
  });
  db.close();
});

module.exports = router;
// The catalog router has three routes:
// A GET route that fetches all catalog items from the database.
// A POST route that creates a new catalog item in the database.
// A DELETE route that deletes a catalog item from the database.
// The catalog router uses the verifyToken middleware to authenticate requests.
// The catalog router uses the sqlite3 module to interact with the SQLite database.
// The catalog router uses the /db.sqlite file as the database.
// The catalog router uses the catalog_items table in the database to store catalog items.
// The catalog router returns JSON responses for all routes.

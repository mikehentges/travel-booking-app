const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();
const verifyToken = require("../middlewares/verify-token");
router.get("/", (req, res, next) => {
  const db = new sqlite3.Database("./db.sqlite");
  db.serialize(() => {
    db.all(
      `
      SELECT
        bookings.*,
        catalog_items.name as catalog_item_name,
        catalog_items.description AS catalog_item_description
      FROM bookings
      INNER JOIN catalog_items ON catalog_items.id = bookings.catalog_item_id
      `,
      [],
      (err, rows) => {
        res.json(rows);
      }
    );
  });
  db.close();
});

router.post("/", (req, res) => {
  const db = new sqlite3.Database("./db.sqlite");
  const { catalog_item_id, name, address, start_date, end_date } = req.body;
  db.serialize(() => {
    const stmt = db.prepare(
      "INSERT INTO bookings (catalog_item_id, name, address, start_date, end_date) VALUES (?, ?, ?, ?, ?)"
    );
    stmt.run(catalog_item_id, name, address, start_date, end_date);
    stmt.finalize();
    res.json({ catalog_item_id, name, address, start_date, end_date });
  });
  db.close();
});

router.delete("/:id", verifyToken, (req, res) => {
  const db = new sqlite3.Database("./db.sqlite");
  const { id } = req.params;
  db.serialize(() => {
    const stmt = db.prepare("DELETE FROM bookings WHERE id = (?)");
    stmt.run(id);
    stmt.finalize();
    res.json({ status: "success" });
  });
  db.close();
});

module.exports = router;
// The bookings router has three routes:
// A GET route that fetches all bookings from the database.
// A POST route that creates a new booking in the database.
// A DELETE route that deletes a booking from the database.
// The bookings router uses the verifyToken middleware to authenticate requests.
// The bookings router uses the sqlite3 module to interact with the SQLite database.
// The bookings router uses the /db.sqlite file as the database.

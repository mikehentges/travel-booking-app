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
    stmt.run(
      catalog_item_id,
      name,
      req.body.address,
      req.body.start_date,
      req.body.end_date
    );
    stmt.finalize();
    res.send("Booking created");
  });
  db.close();
});

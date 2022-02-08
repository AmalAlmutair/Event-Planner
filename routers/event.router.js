const express = require("express");
const {
  createEvent,
  fetchEvents,
  deleteEvent,
  fetchSingleEvent,
  fetchFullyBooked,
  fetchAfterDate,
  searchByName,
} = require("../controllers/event.controller");
const router = express.Router();

router.post("/", createEvent);
router.get("/", fetchEvents);
router.get("/:eventId", fetchSingleEvent);
// router.put("/:eventId", updateEvent);
router.get("/searchByName", searchByName);
router.delete("/:eventId", deleteEvent);
router.get("/fullyBooked/", fetchFullyBooked);
router.get("/givenDate/", fetchAfterDate);

module.exports = router;

const Event = require("../database/models/Event");

exports.fetchEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.fetchSingleEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const events = await Event.findById(eventId);
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createEvent = async (req, res) => {
  const event = req.body;
  try {
    const createdEvent = await Event.create(event);
    res
      .status(201)
      .json({ msg: "Event is created successfully.", payload: createdEvent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const foundEvent = await Event.findByIdAndDelete(eventId);
    if (foundEvent) {
      res.status(200).json({ msg: "The Event is deleted succesfully.." });
    } else {
      res.status(404).json({ msg: "The Event is not found.. " });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.fetchFullyBooked = async (req, res) => {
  try {
    const foundEvent = await Event.find({ numOfSeats: 10 }).exec();
    res.json(foundEvent);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.fetchAfterDate = async (req, res) => {
  try {
    const givenDate = req.body;
    if (givenDate) {
      const events = await Event.find({
        startDate: { $gte: givenDate },
      }).exec();
      res.json(events);
    } else this.fetchEvents();
  } catch (error) {}
};

exports.searchByName = async (req, res) => {
  try {
    const givenName = req.body;
    const foundEvent = await Event.find({ name: givenName }).exec();
    res.json(foundEvent);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

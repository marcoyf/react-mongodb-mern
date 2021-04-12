let express = require("express"),
  router = express.Router();

// book model
let bookSchema = require("../models/Book");

// CREATE book
router.route("/create-book").post((req, res, next) => {
  bookSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ books
router.route("/").get((req, res, next) => {
  bookSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.json(data);
    }
  });
});

// READ a single book
router.route("/edit-book/:id").get((req, res, next) => {
  bookSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// UPDATE book
router.route("/update-book/:id").put((req, res, next) => {
  bookSchema.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("Book updated successfully!");
      }
    }
  );
});

// DELETE book
router.route("/delete-book/:id").delete((req, res, next) => {
  bookSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;

const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");
//const verify2 = require("../verify");
//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/", verify, async (req, res) => {
  
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});
// const searchMovie = async(req, res) => {
//   const q = req.query.q;
//   let movie = await Movie.find();
//   if (q) {
//       result = movie.filter((m) => {
//           return m.title.toLowerCase().indexOf(q.toLowerCase()) !== -1 || m.year.toLowerCase().indexOf(q.toLowerCase()) !== -1 || m.limit.toLowerCase().indexOf(q.toLowerCase()) !== -1 || m.genre.toLowerCase().indexOf(q.toLowerCase()) !== -1
//       })
//       res.status(200).json(result);
//   } else {
//       res.status(203).json([]);
//   }
// }
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;
    console.log("q", q);
    let movie = await Movie.find();

    if (q) {
      result = movie.filter((m) => {
        return (
          m.title.toLowerCase().indexOf(q.toLowerCase()) !== -1 ||
          // m.year.toLowerCase().indexOf(q.toLowerCase()) !== -1 ||
          // m.limit.toLowerCase().indexOf(q.toLowerCase()) !== -1 ||
          m.genre.toLowerCase().indexOf(q.toLowerCase()) !== -1
        );
      });
      console.log("movimovie", result);
      res.status(200).json(result);
    } else {
      res.status(203).json([]);
    }
  } catch (error) {}
});
module.exports = router;

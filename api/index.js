const express = require("express");
const cors = require("cors");
const app = express();
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const corsOptions = require('./config/domain');
const request = require("request");

dotenv.config();

const mongoose = require('./config/mongoDb');
mongoose.connect();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

app.post("/payment", (req, res) => {
  try {
    console.log("vao payment")
    const options = {
      ...req.body,
      amount: req.body.amount * 100,
    };
    console.log("body",req.body);
    instance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Something went wrong" });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.post("/capture/:paymentId", (req, res) => {
  try {
    // console.log(
    //   "vao payment capture" ,req.body.amount
    // );
    // console.log("req paymet id", req.params.paymentId);
    return request(
      {
        method: "POST",
        url: `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: req.body.amount * 100,
          currency: "INR",
        },
      },
      async function (error, response, body) {
        if (error) {
          console.log("req", req);
          console.log(err.message);
          return res.status(500).json({
            message: "Something Went Wrong",
          });
        }
        return res.status(200).json(body);
      }
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});

app.listen(8800, () => {
  console.log("Backend server is running!");
});

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config();

const PORTNUM = process.env.PORT;

connectDB()
  .then(
    app.listen(PORTNUM, () => {
      console.log("SERVER RUNNING ON PORT", PORTNUM);
    })
  )
  .catch((error) => {
    console.log("ERROR OCCURED WHILE DB CONNECTION AND APP CREATION", error);
  });

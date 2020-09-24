const express = require("express");
var mongoose = require("mongoose");

require("./db")
//const BioData = require("./db")
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())




mongoose
  .connect("mongodb://127.0.0.1:27017/teeest", {
     useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(function() {
    console.log("Database connected successfully");
  })
  .catch(function(err) {
    console.log(err.message);
  });

const Schema = mongoose.Schema

var biomeSchema = new Schema(
    {
     name: {
        type: String
      },
      age: {
        type: Number
      }
    },
    { timestamps: true }
  );
  var Biome = mongoose.model("biome", biomeSchema);

  app.post('/bio', function(req, res) {
    var biomee = new Biome({ ...req.body });
    biomee.save().then(function (biodata) {   
        console.log("Bio Data = ", biodata)    
        res.json(biodata).send("Data Saved");
      })
      .catch(function (err) {
        console.log(err);
        if (err.name === "ValidationError")
          return res.status(400).send(`Validation Error: ${err.message}`);
      });
})


app.listen(2222,()=>console.log(`Server Started at PORT 2222`))
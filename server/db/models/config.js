let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fooddeliveryapp", function (
  err,
  connection
) {
  if (err) {
    console.log(err);
  } else {
    console.log(connection);
  }
});

// mongoose.connect(
//   process.env.MONGODB_URI ||
//     "mongodb+srv://salmanaftab88:Imjustforyou1239@cluster0-dfqyn.mongodb.net/saphona?retryWrites=true&w=majority",
//   {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//   },
//   function (err, connection) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(connection.host);
//     }
//   }
// );

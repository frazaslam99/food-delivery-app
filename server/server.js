let express = require("express");
let bdy = require("body-parser");
let cookieParser = require("cookie-parser");
let expressSession = require("express-session");
let mongoose = require("mongoose");
let Conmongo = require("connect-mongo")(expressSession);
require("./db/models/config");
let User = require("./db/models/UserSchema");
let passport = require("passport");
let path = require("path");

let userRoutes = require("./routes/router");
let app = express();

app.use(bdy.urlencoded());
app.use(bdy.json());

passport.serializeUser(function (user, next) {
  next(null, user.id);
});

passport.deserializeUser(function (user_id, next) {
  User.findById(user_id, function (err, user) {
    next(null, user);
  });
});

app.use(
  expressSession({
    secret: "cat is walking",
    store: new Conmongo({
      mongooseConnection: mongoose.connection,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client", "build")));
app.use("/subcatuploads", express.static("./subcatuploads"));
app.use("/uploads", express.static("./uploads"));
app.use("/sliderUploads", express.static("./sliderUploads"));
app.use("/", userRoutes);
app.get("*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

let PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is listin on PORT ${PORT}`));

// let userController = require('./user-controller/usercontroller');

// passport.serializeUser(function (user, next) {
//     next(null, user.id);
// });

// passport.deserializeUser(function (user_id, next) {
//     User.findById(user_id,function(err,user){
//         next(null, user);
//     });
// });

// app.use(expressSession({
//     secret: 'cat is walking',
//       store:new Conmongo({
//        mongooseConnection:mongoose.connection
//    })

// }));

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cookieParser());

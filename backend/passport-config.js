const userModel = require("./models/UserModel");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
  const authUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (user === null) {
      return done(null, false, { message: "No user with that email exists" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Your password is incorect" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authUser));
  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;

//nathan buryswood

// module.exports = function(passport) {
//   passport.use(
//     new localStrategy((email, password, done) => {
//       userModel.findOne({ email: email }, (err, user) => {
//         if (err) throw err;
//         if (!user) return done(null, false);
//         bcrypt.compare(password, user.password, (err, result) => {
//           if (err) throw err;
//           if (result === true) {
//             return done(null, user);
//           } else {
//             return done(null, false);
//           }
//         });
//       });
//     })
//   );

//   passport.serializeUser((user, cb) => {
//     cb(null, user.id);
//   });

//   passport.deserializeUser((id, cb) => {
//     userModel.findOne({ _id: id }, (err, user) => {
//       const userInformation = {
//         username: user.username,
//       };
//       cb(err, userInformation);
//     });
//   });
// };

//web dev simplified

// function initialize(passport, getUserByEmail, getUserById) {
//   const authenticateUser = async (email, password, done) => {
//     const user = getUserByEmail(email);
//     if (user === null) {
//       return done(null, false, { message: "No user with that email" });
//     }

//     try {
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: "Password incorrect" });
//       }
//     } catch (err) {
//       return done(err);
//     }
//   };

//   passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
//   passport.serializeUser((user, done) => done(null, user.id));
//   passport.deserializeUser((id, done) => {
//     return done(null, getUserById(id));
//   });
// }

// module.exports = initialize;

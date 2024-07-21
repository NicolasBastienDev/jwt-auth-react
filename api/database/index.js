const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.rcgc0qv.mongodb.net/r18-jwt?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("CONNEXION DB OK !");
  })
  .catch((e) => {
    console.log("CONNEXION KO : ", e);
  });

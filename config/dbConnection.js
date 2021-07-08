const mongoose = require("mongoose");

function dbConnection() {

    mongoose.connect(
        `mongodb+srv://flybuy:flybuy123@flybuy.zq0h2.mongodb.net/movies?retryWrites=true&w=majority`,
        { useNewUrlParser: true },
        function (err) {
            if (err) {
                console.log("err connecting db: ", err);
            } else {
                console.log("db successfully connected");
            }
        }
    );
}

module.exports = dbConnection;
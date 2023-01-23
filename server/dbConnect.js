const mongoose = require("mongoose");
module.exports = async () => {
  const mongoUri =
    "mongodb+srv://Ashish:SbFc4uRVxzle95tG@cluster0.8ko8h6y.mongodb.net/?retryWrites=true&w=majority";

  try {
    const connect = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongodb Connected : ${connect.connection.host}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

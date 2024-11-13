import mongoose from "mongoose";

export async function dbConnection() {
  mongoose.connect(process.env.MONGODB_URL!);

  const connection = mongoose.connection;

  connection.on("connection", () => {
    console.log("sucessfully connected");
  });

  connection.on("error", (error) => {
    console.log("some issues with the connection", error);
    process.exit();
  });
}

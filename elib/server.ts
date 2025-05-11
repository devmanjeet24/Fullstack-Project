<<<<<<< HEAD
import {config} from "./src/config/config";
import app from "./src/app";
import  connectDB  from "./src/config/db";


const Startserver = async () => {
=======
import app from "./src/app";
import { config } from "./src/config/config";
import connectDB from "./src/config/db";

const startServer = async () => {
  // Connect database
  await connectDB();
>>>>>>> manjeet

  const port = config.port || 3000;

<<<<<<< HEAD
    const port =  config.port;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

Startserver();


// Last End : 1:42
=======
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();
>>>>>>> manjeet

import {config} from "./src/config/config";
import app from "./src/app";
import  connectDB  from "./src/config/db";


const Startserver = async () => {

    await connectDB();

    const port =  config.port;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

Startserver();


// Last End : 1:25 
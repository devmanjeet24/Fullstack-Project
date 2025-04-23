import {config} from "./src/config/config";
import app from "./src/app";


const Startserver = () => {
    const port =  config.port;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

Startserver();
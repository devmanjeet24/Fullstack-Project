import {config} from "./src/config/config";
import app from "./src/app";


const startserver = () => {
    const port =  config.port;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startserver();
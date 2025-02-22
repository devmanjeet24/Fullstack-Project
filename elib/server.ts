import { config } from './src/config/config';
import app from './src/app';
import connectDB from './src/config/db';

const startserver = async () => {

    await connectDB();

    const Port = config.port || 3000;

    app.listen(Port, () => {
        console.log(`listening on the port ${Port}`);
    })
}

startserver();
import {config as conf} from "dotenv";
conf();

const _config = {
    port : process.env.PORT,
    databaseURL : process.env.Mongo_Connection_String,
    env : process.env.NODE_ENV
}

export const config = Object.freeze(_config);
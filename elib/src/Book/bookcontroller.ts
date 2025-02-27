import { NextFunction, Request, Response } from "express"

const Createbook = async (req : Request, res : Response, next : NextFunction) => {
    res.json({message : 'welcome to elib api'})
}

export default Createbook;
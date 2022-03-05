import { Request, Response, Router } from 'express';
import { StatusCodes } from "http-status-codes";
import { Test } from '../entity/Test';
import { User } from "../entity/User";

const router = Router();
const { OK } = StatusCodes;



router.get('/', async (_: Request, res: Response) => {
    const users = await User.find();
    const test = await Test.find();
    return res.status(OK).json({users});
});


export default router;

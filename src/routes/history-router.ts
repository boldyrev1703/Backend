import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '../shared/errors';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import { History } from '../entity/History';
import { adminMw } from './middleware';





// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    update: '/update',
} as const;

router.get(p.get, async (_: Request, res: Response) => {
    const history = await History.find();    
    return res.status(OK).json({history});
});

router.put(p.update, adminMw, async (req: Request, res: Response) => {
    const history  = req.body;
    console.log(history);
    
    await History.update(history.id, history)
    return res.status(OK).end();
});

// Export default
export default router;

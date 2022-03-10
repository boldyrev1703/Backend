import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import userService from '../services/user-service';
import { Contact } from '../entity/Contact';
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
    const contacts = await Contact.find();
    return res.status(OK).json({contacts});
});

router.put(p.update, adminMw, async (req: Request, res: Response) => {
    const contacts  = req.body;

    await Contact.update(contacts.id, contacts)
    return res.status(OK).end();
});

// Export default
export default router;

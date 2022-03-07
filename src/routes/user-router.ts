import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '../shared/errors';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';





// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
} as const;



/**
 * Get all users.
 */
router.get(p.get, async (_: Request, res: Response) => {
    const users = await User.find();
    return res.status(OK).json({users});
});


/**
 * Add one user.
 */
router.post(p.add, async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        throw new ParamMissingError();
    }
    try {
        bcrypt.hash(user.password, 10).then(async function(hash) {
            await User.save({...user, password: hash});        
            return res.status(CREATED).end();
        });
    } catch (error) {
        console.log(error);
    }

});


/**
 * Update one user.
 */
router.put(p.update, async (req: Request, res: Response) => {
    const { user } = req.body;
    // Check param
    if (!user) {
        throw new ParamMissingError();
    }
    try {
        bcrypt.hash(user.password, 10).then(async function(hash) {
            await User.update(user.id, {...user, password: hash});
            return res.status(OK).end();
        });
    } catch (error) {
        console.log(error);
    }
});


/**
 * Delete one user.
 */
router.delete(p.delete, async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check param
    if (!id) {
        throw new ParamMissingError();
    }
    // Fetch data
    await User.delete(Number(id));
    return res.status(OK).end();
});


// Export default
export default router;

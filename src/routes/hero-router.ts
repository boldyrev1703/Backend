import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { Hero } from '../entity/Hero';




// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    update: '/update',
} as const;



router.get(p.get, async (_: Request, res: Response) => {
    const hero = await Hero.find();
    return res.status(OK).json({hero});
});


router.put(p.update, async (req: Request, res: Response) => {
    const hero  = req.body;

    await Hero.update(hero.id, hero)
    return res.status(OK).end();
});

// Export default
export default router;

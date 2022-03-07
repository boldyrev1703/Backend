import { Router } from 'express';
import { adminMw } from './middleware';
import authRouter from './auth-router';
import userRouter from './user-router';
import contactsRouter from './contact-router';
import heroRouter from './hero-router';
import historyRouter from './history-router';


// Init
const apiRouter = Router();

// Add api routes
apiRouter.use('/auth', authRouter);

// 
apiRouter.use('/users', adminMw, userRouter);
apiRouter.use('/contacts', adminMw, contactsRouter);
apiRouter.use('/hero', adminMw, heroRouter);
apiRouter.use('/history', adminMw, historyRouter);

// Export default
export default apiRouter;

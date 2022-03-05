import { Router } from 'express';
import { adminMw } from './middleware';
import authRouter from './auth-router';
import userRouter from './user-router';
import testRouter from './test-router';


// Init
const apiRouter = Router();

// Add api routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', adminMw, userRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/test', testRouter);

// Export default
export default apiRouter;

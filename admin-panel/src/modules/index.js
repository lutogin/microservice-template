import { Router } from 'express';
import helpRouter from './help/help-router';
import forbiddenRouter from './forbidden/forbidden-router';
import userRouter from './user/user-router';
import adminRouter from './admin/admin-router';

const router = Router();

router.use('/help', helpRouter);
router.use('/forbidden', forbiddenRouter);
router.use('/users', userRouter);
router.use('/admins', adminRouter);

export default router;

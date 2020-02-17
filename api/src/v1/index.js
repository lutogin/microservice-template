import './common/config';
import { Router } from 'express';
import userRouter from './user/user-router';
import newsRouter from './news/news-router';
// import vacancyRouter from './vacancy/vacancy-router';

const router = Router();

router.use('/users', userRouter);
router.use('/news', newsRouter);
// router.use('/vacancies', vacancyRouter);

export default router;

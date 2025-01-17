import express from 'express';
import auth from '../../core/auth.js';
import generateGptResponse from './generateGptResponse.js';
import createTask from './createTask.js';
import deleteTask from './deleteTask.js';
import updateTask from './updateTask.js';
import stripePayment from './stripePayment.js';
import updateCurrentUser from './updateCurrentUser.js';
import updateUserById from './updateUserById.js';
import getGptResponses from './getGptResponses.js';
import getAllTasksByUser from './getAllTasksByUser.js';
import getDailyStats from './getDailyStats.js';
import getPaginatedUsers from './getPaginatedUsers.js';
const router = express.Router();
router.post('/generate-gpt-response', auth, generateGptResponse);
router.post('/create-task', auth, createTask);
router.post('/delete-task', auth, deleteTask);
router.post('/update-task', auth, updateTask);
router.post('/stripe-payment', auth, stripePayment);
router.post('/update-current-user', auth, updateCurrentUser);
router.post('/update-user-by-id', auth, updateUserById);
router.post('/get-gpt-responses', auth, getGptResponses);
router.post('/get-all-tasks-by-user', auth, getAllTasksByUser);
router.post('/get-daily-stats', auth, getDailyStats);
router.post('/get-paginated-users', auth, getPaginatedUsers);
export default router;
//# sourceMappingURL=index.js.map
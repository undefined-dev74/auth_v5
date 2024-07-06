import httpStatus from 'http-status';
import { userService } from '../services';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';
import { InternalErrorResponse, SuccessResponse } from '../core/ApiResponse';

const createUser = catchAsync(async (req, res) => {
  const { email, password, name, role } = req.body;
  const user = await userService.createUser(email, password, name, role);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getCurrentUserInstanceAdminStatus = catchAsync(async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const { is_instance_admin } = await userService.currentUserInstanceAdminStatus(userId);

    new SuccessResponse('User instance admin status fetched successfully', {
      is_instance_admin
    }).send(res);
  } catch (error) {
    console.error(error);

    new InternalErrorResponse('Server error').send(res);
  }
});

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getCurrentUserInstanceAdminStatus
};

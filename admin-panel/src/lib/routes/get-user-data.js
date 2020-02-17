import userService from '../../modules/user/user-service';

const CACHE_STORAGE_TIME = 600 * 1000; // 10 minutes

const users = {};

function addToQueueOnClean(userId) {
  setTimeout(() => {
    users[userId] = null;
  }, CACHE_STORAGE_TIME);
}

async function getAndCacheCurrentUser(user) {
  const recivedUser = await userService.api.getCurrentUser({ user });
  users[user.id] = recivedUser;
  addToQueueOnClean(user.id);
  return recivedUser;
}

const getUserData = async request => {
  if (request.cookies) {
    const user = {
      id: request.cookies.user_id,
      accessToken: request.cookies.access_token,
    };

    const fullUser = users[user.id] || (await getAndCacheCurrentUser(user));
    return { ...user, ...fullUser };
  }
  return null;
};

export default getUserData;

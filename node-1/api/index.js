import axios from 'axios'

const USER_URL = 'https://jsonplaceholder.typicode.com/users/';
const USER_POSTS = 'https://jsonplaceholder.typicode.com/posts';

const getUserPost = async (userId = 1) => {
  const { data } = await axios(`${USER_POSTS}?userId=${userId}`);

  return data;
}

const getUserData = async (userId = 1) => {
  const { data } = await axios(`${USER_URL}${userId}`);
  const userPosts = await getUserPost(userId);
  data.posts = userPosts || [];

  return data;
}


export {
  getUserData,
}
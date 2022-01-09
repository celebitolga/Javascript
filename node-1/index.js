import { getUserData } from "./api/index.js";

const userData = await getUserData(1);

console.log(userData)
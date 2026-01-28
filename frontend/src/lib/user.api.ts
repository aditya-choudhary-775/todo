import { apiFetch } from "./api";

export async function getUserData() {
  try{
    const res = await apiFetch("/api/user");
    return res;
  }catch(error){
    throw error;
  }
};
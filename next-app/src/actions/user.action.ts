import axiosInstance from "@/lib/axios";
import { UserStore } from "@/store/user.store";
import { ILoginResponse } from "@/types/user.type";

export async function login(
  username: string,
  password: string
): Promise<ILoginResponse> {
  const { setUser } = UserStore.getState();
  const body = {
    user_id: username,
    user_pass: password,
  };
  const { data } = await axiosInstance.post<ILoginResponse>(
    `users/login`,
    body
  );
  // console.log(data);
  setUser(data);

  return data;
}

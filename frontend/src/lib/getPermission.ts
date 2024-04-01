import { cookies } from "next/headers";
import axios from "axios";

export const getPermissions = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/user/permissions`,
      {
        headers: { Cookie: cookies().toString() },
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      // console.log(res.data)
      return res.data;

    }
  } catch (error: any) {
    // console.log(error?.message);
    return [];
  }
};

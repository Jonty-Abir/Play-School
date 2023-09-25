/* eslint-disable @typescript-eslint/no-explicit-any */
import JsCookie from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { verifyToken } from "../helper/helper";
import { setAuth, setToken } from "../redux/sclice/authSlice";

function useAuth() {
  const disPatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = JsCookie.get("client_user-token");

  useEffect(() => {
    (async () => {
      try {
        if (!token) throw new Error("");
        const data: any = await verifyToken(token);
        disPatch(setAuth({ user: data?.user }));
        disPatch(setToken(token));
        setLoading(false);
      } catch (err: any) {
        disPatch(setAuth({ user: null }));
        disPatch(setToken(""));
        setLoading(false);
      }
    })();
  }, []);
  return { loading };
}

export default useAuth;

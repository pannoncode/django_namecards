import React, { useCallback, useState } from "react";
import axios from "axios";

const SendReq = ({ endpoint }) => {
  const [authUserData, setAuthUserData] = useState({
    result: [],
  });

  const isAuthUser = useCallback(() => {
    // bejelentkezés ellenőrzése/lekérése
    axios
      .get(`/api/${endpoint}`)
      .then((res) => {
        setAuthUserData({
          result: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [endpoint]);

  return { isAuthUser, authUserData };
};

export default SendReq;

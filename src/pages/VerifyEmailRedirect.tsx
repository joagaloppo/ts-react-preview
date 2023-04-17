import React, { useEffect } from "react";
import axios from "axios";

const VerifyEmailRedirect: React.FC = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    const verify = async () => {
      if (token) {
        await axios.post(import.meta.env.VITE_SERVER_URL + "/auth/verify-email?token=" + token);
        window.location.href = "/";
      }
    };

    verify();
  }, []);

  return null;
};

export default VerifyEmailRedirect;

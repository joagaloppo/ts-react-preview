import Layout from "../components/Layout";
import Box from "../components/Box";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";
import moment from "moment";
import Button from "../components/Button";

interface User {
  createdAt: string;
  email: string;
  emailVerified: boolean;
  googleId: string;
  id: string;
  name: string;
  password: string;
  updatedAt: string;
}

function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axiosInstance
      .get("http://localhost:3000/auth/secret")
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    axios.post(import.meta.env.VITE_SERVER_URL + "/auth/logout", { refreshToken: Cookies.get("refreshToken") });
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.href = "/";
  };

  return (
    <Layout>
      <Box>
        <div className="mb-4 space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">Home</h1>
          <p className="text-base font-normal text-gray-600">Welcome to your home page.</p>
        </div>
        {user && (
          <div className="text-base font-normal text-gray-600 font-mono mb-8">
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Google: {user.googleId ? user.googleId : "not a google user"}</p>
            <p>Email Verified: {user.emailVerified.toString()}</p>
            <p>Created At: {moment(user.createdAt).format("DD/MM/YYYY")}</p>
          </div>
        )}
        <Button size="lg" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Layout>
  );
}

export default Home;

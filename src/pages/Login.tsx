import axios from "axios";
import Layout from "../components/Layout";
import Box from "../components/Box";
import Button from "../components/Button";
import Input from "../components/Input";
import Cookies from "js-cookie";
import { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleAuth = (e: any) => {
    e.preventDefault();
    window.location.href = import.meta.env.VITE_GOOGLE_URL;
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const response = await axios.post(import.meta.env.VITE_SERVER_URL + "/auth/login", { email, password });
    const access = response.data.tokens.access.token;
    const refresh = response.data.tokens.refresh.token;

    if (access && refresh) {
      Cookies.set("accessToken", access);
      Cookies.set("refreshToken", refresh);
      window.location.href = "/";
    }
  };

  return (
    <Layout>
      <Box>
        <div className="mb-4 space-y-2">
          <h1 className="text-2xl font-bold text-gray-700">Login</h1>
          <p className="text-base font-normal text-gray-500">Sign in to your account.</p>
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Input
              padding="lg"
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
            />
            <Input
              padding="lg"
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Button variant="filled" size="lg" onClick={(e) => handleLogin(e)}>
              Sign In
            </Button>
            <Button variant="outline" size="lg" onClick={(e) => handleGoogleAuth(e)}>
            Continue with Google
            </Button>
          </div>
        </form>
      </Box>
    </Layout>
  );
};

export default Login;

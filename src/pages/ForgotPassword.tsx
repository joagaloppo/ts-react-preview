import axios from "axios";
import Layout from "../components/Layout";
import Box from "../components/Box";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

    const handleForgotPassword = async (e: any) => {
        e.preventDefault();
        const response = await axios.post(import.meta.env.VITE_SERVER_URL + "/auth/forgot-password", { email });
    };


  return (
    <Layout>
      <Box>
        <div className="mb-4 space-y-2">
          <h1 className="text-2xl font-bold text-gray-700">Forgot Password</h1>
          <p className="text-base font-normal text-gray-500">Enter your email address and we'll send you a link to reset your password.</p>
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
          </div>
          <div className="flex flex-col gap-4">
            <Button variant="filled" size="lg" onClick={(e) => handleForgotPassword(e)}>
              Send Email
            </Button>
          </div>
        </form>
      </Box>
    </Layout>
  );
};

export default ForgotPassword;

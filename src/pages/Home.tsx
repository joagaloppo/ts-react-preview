import Cookies from 'js-cookie';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bearerInstance } from '../utils/axiosInstance';
import authService from '../services/authService';
import Box from '../components/Box';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Modal from '../components/Modal';

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [modalDisabled, setModalDisabled] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    bearerInstance
      .get(`${import.meta.env.VITE_API_URL}/user/me`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = async () => {
    const refreshToken = Cookies.get('refresh_token');
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    if (!refreshToken) navigate('/login');
    setDisabled(true);
    setLogoutLoading(true);
    await authService.logout(refreshToken as string);
    navigate('/login');
  };

  const handleDelete = async () => {
    setModalDisabled(true);
    setDeleteLoading(true);
    try {
      await authService.deleteAccount();
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      navigate('/login');
    } catch (err) {
      console.log(err);
    } finally {
      setDisabled(false);
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} title="Edit your profile">
        <div className="mb-4 space-y-2">
          <h2 className="text-2xl font-semibold text-gray-700">Delete your account</h2>
          <p className="text-base font-normal text-gray-500">Are you sure you want to delete your account?</p>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            disabled={modalDisabled}
            loading={deleteLoading}
            size="lg"
            variant="filled"
            onClick={() => handleDelete()}
          >
            Confirm
          </Button>
          <Button disabled={modalDisabled} size="lg" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>

      <Layout>
        <Box>
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-800">Home</h2>
              <p className="text-base font-normal text-gray-600">Welcome to your home page.</p>
            </div>
            <div className="font-mono text-base font-normal text-gray-600">
              {user ? (
                <>
                  <p>ID: {user.id}</p>
                  <p>Role: {user.role}</p>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Google: {user.googleId ? user.googleId : 'null'}</p>
                  <p>Created At: {moment(user.createdAt).format('DD/MM/YY - HH:mm')}</p>
                </>
              ) : (
                <p>Loading data...</p>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {user?.role === 'admin' && (
                <Button disabled={disabled} variant="filled" size="lg" onClick={() => navigate('/users')}>
                  Manage Users
                </Button>
              )}
              <Button disabled={disabled} variant="filled" loading={logoutLoading} size="lg" onClick={handleLogout}>
                Logout
              </Button>
              <Button disabled={disabled} size="lg" onClick={() => setOpen(true)}>
                Delete Account
              </Button>
            </div>
          </div>
        </Box>
      </Layout>
    </>
  );
};

export default Home;

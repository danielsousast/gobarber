import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const routes = Router();

// Get all appointments
routes.get('/', async (request, response) => {
  return response.json();
});

// Create a new Appointment
routes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default routes;

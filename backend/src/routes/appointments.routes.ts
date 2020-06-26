import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use(ensureAuthenticated);

// Get all appointments
routes.get('/', async (request, response) => {
  const repository = getCustomRepository(AppointmentsRepository);

  const appointments = await repository.find();

  return response.json(appointments);
});

// Create a new Appointment
routes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default routes;

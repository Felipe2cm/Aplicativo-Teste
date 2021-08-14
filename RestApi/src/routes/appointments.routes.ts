import { Router } from "express";
import { parseISO } from "date-fns";

import { getCustomRepository } from "typeorm";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppoinmentService from "../services/CreateAppointmentService";

import ensureAuthenticated from "../middlewares/ensureAuthenticate";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const appointmentsRepository = new CreateAppoinmentService();

  const appointment = await appointmentsRepository.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;

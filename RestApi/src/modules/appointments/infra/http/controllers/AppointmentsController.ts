import { parseISO } from "date-fns";

import CreateAppoinmentService from "@modules/appointments/services/CreateAppointmentService";
import { container } from "tsyringe";
import { Request, Response } from "express";

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppoinmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  }
}

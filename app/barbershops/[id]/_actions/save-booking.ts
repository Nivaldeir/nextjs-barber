"use server";

import { db } from "@/app/_lib/prisma";

interface SaveBookingParams {
  barbershopId: string;
  serviceId: string;
  date: Date;
  userId: string;
}
export const saveBooking = async (params: SaveBookingParams) => {
  await db.booking.create({
    data: {
      serviceId: params.serviceId,
      userId: params.userId,
      date: params.date,
      barbershopId: params.barbershopId,
    },
  });
};

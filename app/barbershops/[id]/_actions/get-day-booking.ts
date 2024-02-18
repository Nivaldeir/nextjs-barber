"use server";
import { db } from "@/app/_lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

export const getDayBooking = async (barbershopId: string, date: Date) => {
  const booking = await db.booking.findMany({
    where: {
      barbershopId: barbershopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
  return booking;
};

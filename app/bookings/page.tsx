import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { useEffect } from "react";
import { isFuture, isPast } from "date-fns";

const BookingPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return redirect("/");
  }
  const [confirmedBookings, finishedBooking] = await Promise.all([
    await db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        services: true,
        barbershop: true,
      },
    }),
    await db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        services: true,
        barbershop: true,
      },
    }),
  ]);
  return (
    <>
      <Header />
      <div className="px-5 py-5">
        <h1 className="text-xl">Agendamentos</h1>
        <h2 className="text-gray-400 capitalize text-sm mt-6 mb-3">
          Confirmados
        </h2>
        <div className="flex flex-col gap-3">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
        <h2 className="text-gray-400 capitalize text-sm mt-6 mb-3">
          Finalizados
        </h2>
        <div className="flex flex-col gap-3">
          {finishedBooking.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingPage;

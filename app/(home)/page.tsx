import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import { format } from "date-fns";
import Search from "./_component/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_component/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops,bookings ] = await Promise.all([
    db.barbershop.findMany(),
    session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session?.user as any).id,
          },
          include: {
            services: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);
 
  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="px-5 mt-6">
        <Search />
      </div>
      <div className="px-5 mt-6">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
          Agendamentos
        </h2>
        <div className="flex overflow-x-auto gap-3">
          {bookings.map((booking) => (
            <BookingItem booking={booking} />
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="px5 text-xs uppercase text-gray-400 font-bold mb-3">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px5 text-xs uppercase text-gray-400 font-bold mb-3">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

const Header = () => {
  const { data, status } = useSession();
  const handleLoginClick = async () => {
    await signIn("google");
  };
  const handleLogoutClick = () => signOut();
  return (
    <Card>
      <CardContent className="p-5 justify-between flex flex-row items-center ">
        <Image src={"/logo.png"} alt="FSW Barber" height={22} width={120} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size={"icon"}>
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SheetHeader className="text-left border-b border-solid border-secondary p-5">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {data?.user ? (
              <div className="flex justify-between  px-5 py-6 items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data.user?.image ?? ""} />
                  </Avatar>
                  <h2 className="font-bold">{data.user.name}</h2>
                </div>
                <Button
                  variant={"secondary"}
                  size={"icon"}
                  onClick={handleLogoutClick}
                >
                  <LogOutIcon />
                </Button>
              </div>
            ) : (
              <div className=" px-5 py-6 gap-3 flex flex-col">
                <div className="flex items-center gap-2">
                  <UserIcon size={32} />
                  <h2>Olá, faça seu login!</h2>
                </div>
                <Button
                  className="w-full justify-start"
                  variant={"secondary"}
                  onClick={handleLoginClick}
                >
                  <LogInIcon className="mr-2" size={18} />
                  Fazer login
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-3 px-5">
              <Button className="justify-start" variant={"outline"} asChild>
                <Link href={"/"}>
                  <HomeIcon scale={18} className="mr-2" />
                  Inicio
                </Link>
              </Button>
              {data?.user && (
                <Button className="justify-start" variant={"outline"} asChild>
                  <Link href={"/bookings"}>
                    <CalendarIcon scale={18} className="mr-2" />
                    Agendamentos
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;

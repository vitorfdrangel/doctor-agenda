"use client";

import { CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";

import { getAvailability } from "../_constants/_helpers/availability";
import UpsertDoctorForm from "./upsert-doctor-form";

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferSelect;
}
const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const doctorsInitials = doctor.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const availability = getAvailability(doctor);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl">
              {doctorsInitials}
            </AvatarFallback>
          </Avatar>

          <div className="mr-1">
            <h3 className="font-medium">{doctor.name}</h3>
            <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col gap-3">
        <Badge variant={"outline"} className="text-sm">
          <CalendarIcon className="mr-1" />
          {availability.from.format("dddd")} - {availability.to.format("dddd")}
        </Badge>

        <Badge variant={"outline"} className="text-sm">
          <ClockIcon className="mr-1" />
          {availability.from.format("HH:mm")} às{" "}
          {availability.to.format("HH:mm")}
        </Badge>

        <Badge variant={"outline"} className="text-sm">
          <DollarSignIcon className="mr-1" />
          {formatCurrencyInCents(doctor.appointmentPriceInCents)}
        </Badge>
      </CardContent>

      <Separator />

      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>

          <UpsertDoctorForm doctor={doctor} />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;

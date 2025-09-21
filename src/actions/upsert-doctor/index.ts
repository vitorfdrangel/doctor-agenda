"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertDoctorSchema } from "./schema";

dayjs.extend(utc);

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const availableFromTime = parsedInput.availableFromTime;
    const availableToTime = parsedInput.availableToTime;

    const availableFromTimeUtc = dayjs()
      .set("hour", parseInt(availableFromTime.split(":")[0]))
      .set("minute", parseInt(availableFromTime.split(":")[1]))
      .set("second", parseInt(availableFromTime.split(":")[2]))
      .utc()
      .format("HH:mm:ss");

    const availableToTimeUtc = dayjs()
      .set("hour", parseInt(availableToTime.split(":")[0]))
      .set("minute", parseInt(availableToTime.split(":")[1]))
      .set("second", parseInt(availableToTime.split(":")[2]))
      .utc()
      .format("HH:mm:ss");

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }

    if (!session.user.clinicId) {
      throw new Error("Usuário sem clínica");
    }

    await db
      .insert(doctorsTable)
      .values({
        ...parsedInput,
        id: parsedInput.id,
        clinicId: session.user.clinicId,
        availableFromTime: availableFromTimeUtc,
        availableToTime: availableToTimeUtc,
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...parsedInput,
          availableFromTime: availableFromTimeUtc,
          availableToTime: availableToTimeUtc,
        },
      });
  });

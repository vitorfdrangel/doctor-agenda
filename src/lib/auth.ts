import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { usersTable, usersToClinicsTable } from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {
      const [userData, clinics] = await Promise.all([
        db.query.usersTable.findFirst({
          where: eq(usersTable.id, user.id),
        }),
        db.query.usersToClinicsTable.findMany({
          where: eq(usersToClinicsTable.userId, user?.id),
          with: {
            clinic: true,
            user: true,
          },
        }),
      ]);

      const clinic = clinics[0];

      return {
        user: {
          ...user,
          clinicId: clinic?.clinicId,
          clinicName: clinic?.clinic.name,
          userName: user?.name,
          plan: userData?.plan,
        },
        session,
      };
    }),
  ],
  user: {
    modelName: "usersTable",
  },
  additionalFields: {
    stripeCustomerId: {
      type: "string",
      fieldName: "stripeCustomerId",
      required: false,
    },
    stripeSubscriptionId: {
      type: "string",
      fieldName: "stripeSubscriptionId",
      required: false,
    },
    plan: {
      type: "string",
      fieldName: "plan",
      required: false,
    },
  },
  session: {
    modelName: "sessionsTable",
  },
  account: {
    modelName: "accountsTable",
  },
  verification: {
    modelName: "verificationsTable",
  },
  emailAndPassword: {
    enabled: true,
  },
});

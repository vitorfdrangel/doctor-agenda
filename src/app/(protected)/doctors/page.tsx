import { asc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddDoctorButton from "./_components/add-doctor-button";
import DoctorCard from "./_components/doctor-card";

const DoctorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinicId) {
    redirect("/clinic-form");
  }
  if (!session.user.plan && !session.user.clinicId) {
    redirect("/new-subscription");
  }

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session.user.clinicId),
    orderBy: asc(doctorsTable.name),
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Médicos</PageTitle>
          <PageDescription>Gerencie seus médicos</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddDoctorButton exceeded={doctors.length >= 3} />
        </PageActions>
      </PageHeader>
      <PageContent>
        <h1>Lista de Médicos</h1>

        <div className="mt-4 grid grid-cols-4 gap-6">
          {doctors.length !== 0 ? (
            doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p className="text-muted-foreground">Nenhum médico encontrado.</p>
          )}
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;

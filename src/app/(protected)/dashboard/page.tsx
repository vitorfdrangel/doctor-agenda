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
import { auth } from "@/lib/auth";

import { DatePicker } from "./_components/date-picker";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinicName) {
    redirect("/clinic-form");
  }

  return (
    <div>
      <PageContainer>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Dashboard</PageTitle>
            <PageDescription>Bem-vindo, {session.user.name}</PageDescription>
          </PageHeaderContent>
          <PageActions>
            <DatePicker />
          </PageActions>
        </PageHeader>
        <PageContent>
          <></>
        </PageContent>
      </PageContainer>
    </div>
  );
};

export default DashboardPage;

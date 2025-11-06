"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "./_components/subscription-plan";

const SubscriptionPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/authentication");
  }
  if (!session.user.clinicId) {
    redirect("/clinic-form");
  }
  if (!session.user.plan && !session.user.clinicId) {
    redirect("/new-subscription");
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Assinatura</PageTitle>
          <PageDescription>Gerencie a sua assinatura.</PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <SubscriptionPlan
          active={session.user.plan === "essential"}
          userEmail={session.user.email}
        />
      </PageContent>
    </PageContainer>
  );
};

export default SubscriptionPage;

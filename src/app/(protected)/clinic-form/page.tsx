import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { auth } from "@/lib/auth";

import ClinicForm from "./_components/form";

const ClinicFormPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar clínica</DialogTitle>
          <DialogDescription>
            Adicione uma clínica para continuar.
          </DialogDescription>
        </DialogHeader>

        <ClinicForm />
      </DialogContent>
    </Dialog>
  );
};

export default ClinicFormPage;

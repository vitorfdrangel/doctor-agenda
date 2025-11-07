"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UpsertDoctorForm from "./upsert-doctor-form";

interface doctorExceededProps {
  exceeded: boolean;
}

const AddDoctorButton = ({ exceeded }: doctorExceededProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Adicionar Médico
        </Button>
      </DialogTrigger>

      {exceeded ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Limite atingido</DialogTitle>
            <DialogDescription>
              O limite de médicos foi atingido. Por favor, remova um médico para
              adicionar um novo.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : (
        <UpsertDoctorForm onSuccess={() => setIsOpen(false)} isOpen={isOpen} />
      )}
    </Dialog>
  );
};

export default AddDoctorButton;

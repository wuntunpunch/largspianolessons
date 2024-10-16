"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from "./contact-form";

export default function ContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Get Started Today</Button>
      </DialogTrigger>
      <ContactForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Dialog>
  );
}

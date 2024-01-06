"use client";
import React from "react";
import FormPersonInfo from "@/components/Forms/FormPersonInfo";

import { useAuth } from "@/lib/hook/useAuth";

type Props = {};

export default function Cuenta({}: Props) {

  useAuth()

  return (
    <section className="lg:w-2/4 mx-auto">
      {/* Personal Profile */}
      <section className="p-5 bg-white">
        <h4 className="mb-2 text-lg font-bold">Perfil Personal</h4>
        <FormPersonInfo />
      </section>
    </section>
  );
}

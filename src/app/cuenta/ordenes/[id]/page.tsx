import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function OrderPage({ params: { id } }: Props) {
  return (
    <section className="lg:px-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orden #{id}</h1>
        <p>Fecha: 17-01-2024</p>
      </div>
      <Separator className="bg-gray-600" />
      <section className="mt-4 flex justify-center items-center sm:items-start sm:justify-between flex-wrap">
        <div className="bg-white w-72 my-4 sm:mx-2 px-4 py-4 shadow-md">
          <h2 className="font-bold text-lg mb-2">Facturac&iacute;on</h2>
          <p className="nombre">
            <span className="font-bold">Nombre:</span> Sabrina Di Gregorio
          </p>
          <p className="direccion1">
            <span className="font-bold">Direcc&iacute;on 1:</span> calle 1772 NW
          </p>
          <p className="direccion2">
            <span className="font-bold">Direcc&iacute;on 2:</span> 12 Street
          </p>
          <p className="ciudad--estado">
            <span className="font-bold">Ciudad/Estado:</span> Valencia, Carabobo
          </p>
          <p className="codigo--postal">
            <span className="font-bold">CP:</span> 2005
          </p>
        </div>
        <div className="bg-white w-72 my-4 sm:mx-2 px-4 py-4 shadow-md">
          <h2 className="font-bold text-lg mb-2">Direcc&iacute;on</h2>
          <p className="nombre">
            <span className="font-bold">Nombre:</span> Sabrina Di Gregorio
          </p>
          <p className="direccion1">
            <span className="font-bold">Direcc&iacute;on 1:</span> av. las
            delicias
          </p>
          {/* <p className="direccion2"><span className="font-bold">Direcc&iacute;on 2:</span> 12 Street</p> */}
          <p className="ciudad--estado">
            <span className="font-bold">Ciudad/Estado:</span> Maracay, Aragua
          </p>
          <p className="codigo--postal">
            <span className="font-bold">CP:</span> 2101
          </p>
        </div>
        <div className="bg-white w-72 my-4 sm:mx-2 px-4 py-4 shadow-md">
          <h2 className="font-bold text-lg mb-2">Resumen Total</h2>
          <p>
            Sub-total: <span className="font-bold">$50,00</span>
          </p>
          <p>
            Envio: <span className="font-bold">$16,00</span>
          </p>
          <Separator className="bg-gray-500 my-2" />
          <p>
            Total: <span className="font-bold">$66,00</span>
          </p>
        </div>
      </section>
    </section>
  );
}

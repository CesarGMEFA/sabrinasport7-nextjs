import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function OrderCard() {
  return (
    <div className="bg-white mb-6 p-2 lg:p-5 shadow-md">
      <div className="flex justify-between">
        <div className="text-left">
          <h2 className="text-base lg:text-xl font-bold mb-1">Orden #1</h2>
          <p className="text-sm lg:text-base font-bold mb-1">Productos: 2</p>
          <p className="text-sm lg:text-base font-bold mb-1 hidden md:block">
            Cantidad: 5
          </p>
        </div>
        <div className="facturacion hidden md:block">
          <h3 className="font-bold">Facturacion</h3>
          <p className="nombre">Sabrina Di Gregorio</p>
          <p className="direccion1">calle 1772 NW</p>
          <p className="direccion2">12 Street</p>
          <p className="ciudad--estado">Valencia, Carabobo</p>
          <p className="codigo--postal">CP: 2005</p>
        </div>
        <div className="direccion hidden md:block">
          <h3 className="font-bold">Direcc&iacute;on</h3>
          <p className="nombre">Sabrina Di Gregorio</p>
          <p className="direccion1">av. las delicias</p>
          {/* <p className="direccion2">12 Street</p> */}
          <p className="ciudad--estado">Maracay, Aragua</p>
          <p className="codigo--postal">CP: 2101</p>
        </div>
        <div className="text-right">
          <p className="text-sm lg:text-base mb-1">Fecha: 2021-08-23</p>
          <p className="text-sm lg:text-base font-bold mb-1 block md:hidden">
            Cantidad: 5
          </p>
        </div>
      </div>
      <Separator className="my-3 bg-gray-400" />
      <div className="flex justify-between items-center">
        <p className="font-bold">
          Status:{" "}
          <span className="ml-1 px-1.5 pt-0.5 pb-1 rounded-2xl bg-red-300 text-red-900">
            cancelado
          </span>
        </p>
        <Link
          href={"/cuenta/ordenes/143"}
          target="_blank"
          className="text-purple-600 hover:text-purple-900 hover:underline"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}

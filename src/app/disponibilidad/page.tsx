import Disponibilidad from "@/components/sections/Disponibilidad";

export default async function DisponibilidadPage({
  searchParams,
}: {
  searchParams: Promise<{ nivel?: string; intro?: string; calibrar?: string }>;
}) {
  const { nivel, intro, calibrar } = await searchParams;
  return <Disponibilidad nivelInicial={nivel} intro={intro === "1"} calibrar={calibrar === "1"} />;
}

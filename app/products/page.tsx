import type { Metadata } from "next";
import ProductsIndexClient from "@/components/sections/products/ProductsIndexClient";

export const metadata: Metadata = {
  title: "Products | Connexxion Telecom",
  description:
    "iGov, CNX247 and iCoop — three platforms built and maintained in-house by Connexxion Telecom for government, business and cooperative operations.",
};

export default function ProductsPage() {
  return <ProductsIndexClient />;
}

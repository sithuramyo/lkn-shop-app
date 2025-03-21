import Image from "next/image";
import PaginatedItems from "@/components/ShoppingItems";
import ShoppingItems from "@/components/ShoppingItems";
import { ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-36">
      <ShoppingItems />
    </main>
  );
}

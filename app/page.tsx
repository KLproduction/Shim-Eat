import { Poppins } from "next/font/google";
import { revalidatePath } from "next/cache";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Hero from "@/components/Hero";
import { createProducts, deleProducts } from "@/data/products";
import AdminSwitch from "@/components/AdminSwitch";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

// revalidatePath("/");
export default async function Home() {
  // const deleProductsfromDb = await deleProducts();
  // const updateList = await createProducts();
  return (
    <div>
      <Hero />
    </div>
  );
}

import { Poppins } from "next/font/google";
import { revalidatePath } from "next/cache";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Hero from "@/components/Hero";

import AdminSwitch from "@/components/AdminSwitch";
import HeroNew from "@/components/HeroNew/HeroNew";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default async function Home() {
  return (
    <div>
      <HeroNew />
    </div>
  );
}

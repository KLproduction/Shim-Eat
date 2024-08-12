"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DrinkMenu from "@/components/Menu/DrinkMenu";
import MainMenu from "@/components/Menu/MainMenu";
import SaladMenu from "@/components/Menu/SaladMenu";
import { Button } from "@/components/ui/button";
import MySpinner from "@/components/ui/MySpinner";
import { getOnSaleProducts } from "@/data/getOnsaleProducts";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { Link, animateScroll } from "react-scroll";
import { motion } from "framer-motion";

const fadeInMotionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.75,
    },
  },
};

const fadeInMotionChildVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const MenuPage = () => {
  const [products, setProducts] = useState<Product[] | null>();

  useEffect(() => {
    (async () => {
      const data = await getOnSaleProducts();
      setProducts(data);
    })();
  }, []);

  if (!products) {
    <MySpinner />;
  }

  return (
    <>
      <div className="fixed left-1/2 top-[8%] z-[10] m-0 w-[80%] -translate-x-[50%] rounded-full border border-orange-500 bg-white/75 p-3 opacity-80 backdrop-blur-lg transition-all sm:top-[12%] sm:min-h-[20px] sm:w-auto sm:shadow-md">
        <div className="flex items-center justify-center gap-5">
          <Button
            asChild
            variant={"ghost"}
            className="cursor-pointer rounded-full p-3 hover:bg-orange-500 hover:text-zinc-50"
          >
            <Link to="Salads" smooth={true} offset={-150} duration={500}>
              Salads
            </Link>
          </Button>

          <Button
            asChild
            variant={"ghost"}
            className="cursor-pointer rounded-full p-3 hover:bg-orange-500 hover:text-zinc-50"
          >
            <Link to="Mains" smooth={true} offset={-150} duration={500}>
              Mains
            </Link>
          </Button>
          <Button
            asChild
            variant={"ghost"}
            className="cursor-pointer rounded-full p-3 hover:bg-orange-500 hover:text-zinc-50"
          >
            <Link to="Drinks" smooth={true} offset={-150} duration={500}>
              Drinks
            </Link>
          </Button>
        </div>
      </div>
      <MaxWidthWrapper>
        <motion.div className="mt-20" variants={fadeInMotionVariants}>
          <motion.div className="Salads" variants={fadeInMotionChildVariants}>
            <SaladMenu products={products} />
          </motion.div>
          <motion.div className="Mains" variants={fadeInMotionChildVariants}>
            <MainMenu products={products} />
          </motion.div>
          <motion.div className="Drinks" variants={fadeInMotionChildVariants}>
            <DrinkMenu products={products} />
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </>
  );
};

export default MenuPage;

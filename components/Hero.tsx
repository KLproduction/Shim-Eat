import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section className="sticky h-dvh w-full">
      <motion.img
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        src="https://utfs.io/f/165d6336-e328-4b12-b11f-d0f280d2ed94-mf4bfd.png"
        className="absolute inset-0 h-full w-full object-cover brightness-50 filter"
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut", delay: 0.75 }}
        className="relative top-[150px] ml-5 sm:ml-12"
      >
        <div className="pb-[10%] text-start sm:pb-[30%] md:pb-[20%] xl:ml-[10%]">
          <div className="mb-6 flex flex-col gap-3 text-4xl font-bold sm:mb-12 sm:text-6xl">
            <div className="text-zinc-100">Fresh</div>
            <div className="text-orange-500">Fast</div>
            <div className="text-zinc-100">Flavorful</div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-orange-500 sm:text-5xl">
              Your <span className="uppercase text-zinc-100">Salad</span> is
              Ready!
            </h1>
            <p className="sm:text-md mt-3 text-sm font-bold text-zinc-100">
              From Farm to Table – Taste the Freshness in Every Bite
            </p>
            <div className="mt-3 flex items-center justify-start gap-5 sm:mt-5">
              <Button
                size={"lg"}
                className="border-2 border-zinc-100 bg-transparent text-zinc-100 backdrop-blur-md"
                onClick={() => {
                  window.scrollBy({
                    top: window.innerHeight + 100, // Scroll down by 100vh
                    behavior: "smooth", // Adds a smooth scrolling effect
                  });
                }}
              >
                {`What's News`}
              </Button>
              <Button asChild size="lg" className="flex justify-center gap-3">
                <Link
                  href="/menu"
                  className="flex items-center justify-around uppercase"
                >
                  <h1>Our Menu</h1> <BiChevronRight className="text-xl" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;

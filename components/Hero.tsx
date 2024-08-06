import Image from "next/image";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

const Hero = () => {
  return (
    <MaxWidthWrapper>
      <section className="flex h-dvh w-full flex-col items-center justify-center">
        <div className="flex items-center justify-around">
          <div className="mt-[100px] flex flex-col gap-8 p-3 md:my-auto">
            <h1 className="text-6xl font-bold text-green-600">
              Fresh,
              <br />
              <span className="uppercase text-orange-600">Fast,</span>
              <br /> Flavorful
            </h1>
            <h1 className="text-5xl font-bold text-orange-600">
              Your <span className="uppercase text-green-600">Salad</span> is
              Ready!
            </h1>
            <p className="text-md font-bold text-zinc-500">
              From Farm to Table – Taste the Freshness in Every Bite
            </p>
            <div className="flex items-center justify-center gap-5">
              <Button asChild size="lg" className="flex justify-center gap-3">
                <Link
                  href="/menu"
                  className="flex items-center justify-around uppercase"
                >
                  <h1>See Menu</h1> <BiChevronRight className="text-xl" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="ml-auto">
            <img
              src="/hero-2.png"
              className="fixed right-0 top-[-100px] z-[-1] mt-[50px] opacity-30 md:relative md:z-10 md:p-0 md:opacity-100"
            />
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default Hero;

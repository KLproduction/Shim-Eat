import Image from "next/image";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

const Hero = () => {
  return (
    <MaxWidthWrapper>
      <section className="flex flex-col items-center justify-center h-full">
        <div className="flex items-center justify-around">
          <div className="mt-[100px] flex flex-col gap-8 md:my-auto p-3">
            <h1 className=" text-6xl font-bold text-green-600">
              Fresh,
              <br />
              <span className="text-orange-600 uppercase">Fast,</span>
              <br /> Flavorful
            </h1>
            <h1 className=" text-orange-600 text-5xl font-bold">
              Your <span className="text-green-600 uppercase">Salad</span> is
              Ready!
            </h1>
            <p className=" text-zinc-500 font-bold text-md">
              From Farm to Table – Taste the Freshness in Every Bite
            </p>
            <div className=" flex items-center justify-center gap-5">
              <Button asChild size="lg" className=" flex justify-center gap-3">
                <Link href="/menu" className="uppercase">
                  <h1>Order Now</h1> <BiChevronRight className="text-3xl" />
                </Link>
              </Button>
            </div>
          </div>
          <div className=" ml-auto">
            <img
              src="https://i.ibb.co/LYK7mfm/hero-2.png"
              className="mt-[50px] z-[-1] md:z-10 fixed top-3 right-0 opacity-30 md:relative md:opacity-100 md:p-0"
            />
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default Hero;

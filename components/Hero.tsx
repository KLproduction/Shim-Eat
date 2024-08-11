import Image from "next/image";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
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
// const Hero = () => {
//   return (
//     <MaxWidthWrapper>
//       <motion.section
//         variants={fadeInMotionVariants}
//         initial="hidden"
//         animate="show"
//         className="flex h-dvh w-full flex-col items-center justify-center"
//       >
//         <div className="flex items-center justify-around">
//           <motion.div
//             initial={{ opacity: 0, x: -100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
//             className="mt-[10px] flex flex-col gap-8 p-3 md:my-auto"
//           >
//             <div className="mb-2 flex flex-col gap-3 text-6xl font-bold">
//               <motion.div className="text-green-600">Fresh</motion.div>

//               <motion.div className="text-orange-600">Fast</motion.div>

//               <motion.div className="text-green-600">Flavorful</motion.div>
//             </div>
//             <motion.div>
//               <h1 className="text-5xl font-bold text-orange-600">
//                 Your <span className="uppercase text-green-600">Salad</span> is
//                 Ready!
//               </h1>
//               <p className="text-md font-bold text-zinc-500">
//                 From Farm to Table – Taste the Freshness in Every Bite
//               </p>
//               <div className="mt-5 flex items-center justify-start">
//                 <Button asChild size="lg" className="flex justify-center gap-3">
//                   <Link
//                     href="/menu"
//                     className="flex items-center justify-around uppercase"
//                   >
//                     <h1>See Menu</h1> <BiChevronRight className="text-xl" />
//                   </Link>
//                 </Button>
//               </div>
//             </motion.div>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
//             className="ml-auto hidden sm:block"
//           >
//             <img
//               src="/hero-2.png"
//               className="fixed right-0 top-[-100px] z-[-1] mt-[50px] opacity-30 md:relative md:z-10 md:p-0 md:opacity-100"
//             />
//           </motion.div>
//           <motion.div className="ml-auto block sm:hidden">
//             <img
//               src="/hero-2.png"
//               className="fixed right-0 top-[-100px] z-[-1] mt-[150px] opacity-30 sm:mt-[200px] md:relative md:z-10 md:p-0 md:opacity-100"
//             />
//           </motion.div>
//         </div>
//       </motion.section>
//     </MaxWidthWrapper>
//   );
// };

const Hero = () => {
  return (
    <motion.section
      className="sticky h-dvh w-full"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
    >
      <img
        src="https://utfs.io/f/39e50a54-9972-4b98-a353-b1b1ca703518-uidgai.png"
        className="absolute inset-0 h-full w-full object-cover brightness-50 filter"
      />
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.75 }}
        className="relative top-[100px] ml-5 transition-all sm:ml-12"
      >
        <div className="pb-[10%] text-start sm:pb-[30%] md:pb-[20%] xl:ml-[10%]">
          <div className="mb-6 flex flex-col gap-3 text-4xl font-bold sm:mb-12 sm:text-6xl">
            <motion.div className="text-zinc-100">Fresh</motion.div>
            <motion.div className="text-orange-500">Fast</motion.div>
            <motion.div className="text-zinc-100">Flavorful</motion.div>
          </div>
          <motion.div>
            <h1 className="text-3xl font-bold text-orange-500 sm:text-5xl">
              Your <span className="uppercase text-zinc-100">Salad</span> is
              Ready!
            </h1>
            <p className="sm:text-md mt-3 text-sm font-bold text-zinc-100">
              From Farm to Table – Taste the Freshness in Every Bite
            </p>
            <div className="mt-3 flex items-center justify-start sm:mt-5">
              <Button asChild size="lg" className="flex justify-center gap-3">
                <Link
                  href="/menu"
                  className="flex items-center justify-around uppercase"
                >
                  <h1>See Menu</h1> <BiChevronRight className="text-xl" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;

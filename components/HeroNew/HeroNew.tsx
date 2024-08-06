"use client";

import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "../ui/button";
import Link from "next/link";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import { count } from "console";
import Hero from "../Hero";
import { getProductByName } from "@/data/getProductByName";
import { Product } from "@prisma/client";
import { getProducts } from "@/data/getProducts";

const HeroNew = () => {
  const [active, setActive] = useState(1);
  const [items, setItems] = useState<NodeListOf<HTMLElement> | null>(null);
  const [direction, setDirection] = useState("next");
  const carousel = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);
  const [auto, setAuto] = useState(true);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [other1ID, setOther1ID] = useState("");
  const [other2ID, setOther2ID] = useState("");
  const [activeID, setActiveID] = useState("");
  const [itemID, setItemID] = useState("");

  useEffect(() => {
    setItems(
      document.querySelectorAll(".carousel .item") as NodeListOf<HTMLElement>,
    );
  }, []);

  const countItem = items?.length;

  const next = () => {
    setDirection("next");
    setActive((prevActive) => (prevActive + 1) % countItem!);
    setAnimate(true);
    setAuto(false);
    startAutoSlide();
  };

  const prev = () => {
    setDirection("prev");
    setActive((prevActive) => {
      const newIndex = prevActive - 1 < 0 ? countItem! - 1 : prevActive - 1;
      return newIndex;
    });
    setAnimate(true);
    setAuto(false);
    startAutoSlide();
  };

  useEffect(() => {
    if (auto && items && items.length > 0) {
      autoSlideRef.current = setInterval(next, 5000);
    }
  }, [items, auto]);

  const startAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    autoSlideRef.current = setInterval(next, 5000);
  };

  useEffect(() => {
    if (!animate) return;
    const timeout = setTimeout(() => {
      items?.forEach((item, index) => {
        item.classList.remove("active", "other_1", "other_2");
      });
      items?.forEach((e) => {
        const img = e.querySelector(".image img") as HTMLElement;
        if (img) {
          img.style.animation = "none";
          void e.offsetWidth;
          img.style.animation = "";
        }
      });

      if (direction === "next") {
        carousel.current?.classList.add("next");
        carousel.current?.classList.remove("prev");
      } else {
        carousel.current?.classList.add("prev");
        carousel.current?.classList.remove("next");
      }

      if (countItem) {
        if (direction === "next") {
          if (countItem > 0) {
            items[active]?.classList.add("active");
            items[(active - 1 + countItem) % countItem]?.classList.add(
              "other_1",
            );
            items[(active + 1) % countItem]?.classList.add("other_2");
          }
        } else {
          items[active]?.classList.add("active");
          items[(active + 1) % countItem]?.classList.add("other_1");
          items[(active - 1 + countItem) % countItem]?.classList.add("other_2");
        }
      }
    }, 10);

    return () => clearTimeout(timeout);
  }, [active, items, countItem]);

  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  useEffect(() => {
    if (products) {
      const other1 = products.filter(
        (product) => product.name === "Elegant Chicken Skewer Platter",
      )[0].id;
      const other2 = products.filter(
        (product) => product.name === "Mediterranean Tuna Pasta Salad",
      )[0].id;
      const active = products.filter(
        (product) => product.name === "Garden Delight Steak Salad",
      )[0].id;
      const item = products.filter(
        (product) => product.name === "Sesame Pork Bao",
      )[0].id;

      setOther1ID(other1);
      setOther2ID(other2);
      setActiveID(active);
      setItemID(item);

      console.log(other1ID);
      console.log(other2ID);
      console.log(activeID);
      console.log(itemID);
    }
  }, [products]);

  return (
    <>
      <Hero />
      <main className="flex flex-col">
        <section className="carousel next" ref={carousel}>
          <div className="list">
            <article className="item other_1">
              <div className="main-content bg-zinc-500 text-white">
                <div className="content">
                  <h2>Elegant Chicken Skewer Platter</h2>
                  <p className="price">{formatPrice(5.99)}</p>
                  <p className="description">
                    Indulge in the simplicity and sophistication of our Elegant
                    Chicken Skewer Platter. Perfectly grilled, juicy chicken
                    skewers are served alongside a tangy peanut dipping sauce
                    and a refreshing slaw. This dish balances smoky flavors with
                    sweet and sour notes, making it an ideal choice for a light
                    lunch or as a shared appetizer. Each skewer is carefully
                    prepared to ensure every bite is as delightful as the last.
                  </p>
                  <Button asChild className="bg-green-500" size={"lg"}>
                    <Link href={`/product?product=${other1ID}`}>Order Now</Link>
                  </Button>
                </div>
              </div>
              <figure className="image">
                <img
                  src={
                    "https://utfs.io/f/81ed3b31-f868-400f-8adc-0bbc03a3aa5e-65d0vx.png" ||
                    undefined
                  }
                  alt=""
                />
                <figcaption className="flex flex-col gap-5 text-white">
                  <h2>Elegant Chicken Skewer Platter</h2>
                  <div>
                    <Button asChild className="bg-green-500" size={"sm"}>
                      <Link href={`/product?product=${other1ID}`}>
                        Order Now
                      </Link>
                    </Button>
                  </div>
                </figcaption>
              </figure>
            </article>
            <article className="item active">
              <div className="main-content bg-orange-200">
                <div className="content">
                  <h2>Garden Delight Steak Salad</h2>
                  <p className="price">{formatPrice(8.99)}</p>
                  <p className="description">
                    Experience the freshness of our Garden Delight Steak Salad.
                    Tender, grilled steak slices top a bed of crisp greens,
                    juicy cherry tomatoes, and a drizzle of rich balsamic glaze.
                    This salad is a feast for the senses, offering a perfect mix
                    of savory steak and the crisp freshness of seasonal greens.
                    Ideal for those seeking a fulfilling yet health-conscious
                    meal, it is a testament to how indulgent yet balanced a
                    salad can be.
                  </p>
                  <Button asChild className="bg-green-500" size={"lg"}>
                    <Link href={`/product?product=${activeID}`}>Order Now</Link>
                  </Button>
                </div>
              </div>
              <figure className="image">
                <img
                  src={
                    "https://utfs.io/f/e4c58bfb-c2f2-4f3c-b93f-a091c903bcff-tn6yzk.png" ||
                    undefined
                  }
                  alt=""
                />
                <figcaption className="top-20 flex flex-col gap-1">
                  <h2>Garden Delight Steak Salad</h2>
                  <div>
                    <Button asChild className="bg-green-500" size={"sm"}>
                      <Link href={`/product?product=${activeID}`}>
                        Order Now
                      </Link>
                    </Button>
                  </div>
                </figcaption>
              </figure>
            </article>
            <article className="item other_2">
              <div className="main-content bg-yellow-800 text-white">
                <div className="content">
                  <h2>Mediterranean Tuna Pasta Salad</h2>
                  <p className="price">{formatPrice(8.99)}</p>
                  <p className="description">
                    Dive into the vibrant flavors of the Mediterranean with our
                    Tuna Pasta Salad. This cold pasta salad mixes flaked tuna,
                    ripe olives, and a light dressing of olive oil, capturing
                    the essence of Mediterranean cuisine. It is perfect for a
                    quick, nutritious meal that does not compromise on flavor.
                    Enjoy it as a standalone dish or as a refreshing side to any
                    main course.
                  </p>
                  <Button asChild className="bg-green-500" size={"lg"}>
                    <Link href={`/product?product=${other2ID}`}>Order Now</Link>
                  </Button>
                </div>
              </div>
              <figure className="image">
                <img
                  src={
                    "https://utfs.io/f/606ad341-a2d3-4bd6-bda8-24f43f862242-gtr07o.png" ||
                    undefined
                  }
                  alt=""
                />
                <figcaption className="flex flex-col gap-1 text-white">
                  <h2>Mediterranean Tuna Pasta Salad</h2>
                  <div>
                    <Button asChild className="bg-green-500" size={"sm"}>
                      <Link href={`/product?product=${other2ID}`}>
                        Order Now
                      </Link>
                    </Button>
                  </div>
                </figcaption>
              </figure>
            </article>
            <article className="item">
              <div className="main-content bg-zinc-200">
                <div className="content">
                  <h2>Sesame Pork Bao</h2>
                  <p className="price">{formatPrice(6.99)}</p>
                  <p className="description">
                    Savor the rich flavors of our Sesame Pork Bao. Soft, pillowy
                    bao buns are stuffed with succulently roasted pork, enhanced
                    with a hint of sesame and served with a side of crisp
                    vegetables. Each bite offers a wonderful mix of textures and
                    flavors, making these bao buns an irresistible treat.
                    Whether as a snack or a main dish, they are crafted to bring
                    a taste of Asian delicacies right to your plate.
                  </p>
                  <Button asChild className="bg-green-500" size={"lg"}>
                    <Link href={`/product?product=${itemID}`}>Order Now</Link>
                  </Button>
                </div>
              </div>
              <figure className="image">
                <img
                  src={
                    "https://utfs.io/f/1467007f-0fc5-4185-8e27-298bf919771d-fqeve2.png" ||
                    undefined
                  }
                  alt=""
                />
                <figcaption className="flex flex-col gap-1">
                  <h2>Sesame Pork Bao</h2>
                  <div>
                    <Button asChild className="bg-green-500" size={"sm"}>
                      <Link href={`/product?product=${itemID}`}>Order Now</Link>
                    </Button>
                  </div>
                </figcaption>
              </figure>
            </article>
          </div>
          <div className="arrows">
            <Button
              variant={"outline"}
              className="prevBtn bg-white/50"
              onClick={prev}
            >
              <AiOutlineCaretLeft />
            </Button>
            <Button
              variant={"outline"}
              className="nextBtn bg-white/50"
              onClick={next}
            >
              <AiOutlineCaretRight />
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default HeroNew;

import { db } from "@/lib/db";
import { ProductCategory } from "@prisma/client";

export const ADDONSPRICE = {
  size: {
    standard: 0,
    large: 2.0,
  },
  addOns: {
    redRice: 1,
    potatoSalad: 1.5,
    brownToast: 0,
    noAddOns: 0,
  },
};

export const products = [
  {
    name: "Garden Delight Steak Salad",
    image: "https://utfs.io/f/04cdb851-77ba-4d06-9ecc-e1df48d20996-6d8bo9.png",
    category: "salad" as ProductCategory,
    price: 8.99,
    description:
      "Fresh greens topped with grilled steak, cherry tomatoes, and a balsamic glaze.",
  },
  {
    name: "Rainbow Tofu Power Bowl",
    image: "https://utfs.io/f/6ea94a36-087a-4d4b-b5f6-e13a3f082e15-flccuh.png",
    category: "main" as ProductCategory,
    price: 8.99,
    description:
      "Marinated tofu with quinoa, kale, beets, and a citrus dressing.",
  },
  {
    name: "Chickpea Avocado Curry Box",
    image: "https://utfs.io/f/c097569d-d822-49a3-87a3-767291caa782-jouzt7.png",
    category: "main" as ProductCategory,
    price: 11.99,
    description: "Creamy chickpea and avocado curry served with jasmine rice.",
  },
  {
    name: "Mediterranean Tuna Pasta Salad",
    image: "https://utfs.io/f/b4e675be-ffad-4ebd-a70e-c12678795bed-676t3h.png",
    category: "salad" as ProductCategory,
    price: 8.99,
    description:
      "Cold pasta salad with flaked tuna, olives, and a light olive oil dressing.",
  },
  {
    name: "Avocado Lentil Harvest Salad",
    image: "https://utfs.io/f/34938dad-6a68-4ede-8be5-5882f1dd2713-l1pwtz.png",
    category: "salad" as ProductCategory,
    price: 8.99,
    description:
      "Lentils and avocado with a mix of arugula, nuts, and a lemon vinaigrette.",
  },
  {
    name: "Grilled Asparagus Parmesan Salad",
    image: "https://utfs.io/f/927ed394-1e1d-4719-ad5e-52676edfd863-9uvq2w.png",
    category: "salad" as ProductCategory,
    price: 8.99,
    description:
      "Grilled asparagus with shaved parmesan, rocket, and a squeeze of lemon.",
  },
  {
    name: "Sesame Pork Bao",
    image: "https://utfs.io/f/3c2e38ae-3c38-458f-a6bf-3ceb8172a3c5-elgy8g.png",
    category: "main" as ProductCategory,
    price: 6.99,
    description:
      "Soft bao buns filled with sesame-flavored pork and crisp vegetables.",
  },
  {
    name: "Avocado Egg-Toast Supreme",
    image: "https://utfs.io/f/fe210e39-3d83-48ef-981a-0cae5ee55dc7-agso6z.png",
    category: "main" as ProductCategory,
    price: 5.99,
    description:
      "Toasted sourdough with mashed avocado, poached egg, and a sprinkle of chili flakes.",
  },
  {
    name: "Elegant Chicken Skewer Platter",
    image: "https://utfs.io/f/ccedf4a0-3817-4309-b014-b5efd3bb5d53-y7l2za.png",
    category: "main" as ProductCategory,
    price: 5.99,
    description:
      "Grilled chicken skewers served with a peanut dipping sauce and slaw.",
  },
  {
    name: "Fusion Feast Poke Bowl",
    image: "https://utfs.io/f/8191d520-b7ad-4095-88d9-5a3c5b6565f2-k1ftzk.png",
    category: "main" as ProductCategory,
    price: 6.99,
    description:
      "A mix of fresh tuna, rice, avocado, and exotic fruits with a soy-sesame dressing.",
  },
  {
    name: "Asian Noodle Delight",
    image: "https://utfs.io/f/273882c3-c755-4ac5-a8f7-d7a5d2e4f256-uo7sg0.png",
    category: "main" as ProductCategory,
    price: 4.99,
    description:
      "Stir-fried noodles with vegetables and a hint of ginger and soy.",
  },
  {
    name: "Spicy Cucumber Sesame Salad",
    image: "https://utfs.io/f/3e8382b8-5528-488e-ac83-f177a31b1212-ymt3cb.png",
    category: "salad" as ProductCategory,
    price: 4.99,
    description: "Crisp cucumber salad with a spicy sesame dressing.",
  },
  {
    name: "Citrus Bliss Smoothie",
    image: "https://utfs.io/f/523692c7-5039-4798-84e2-8f2a6ab57d2f-szggxj.png",
    category: "drinks" as ProductCategory,
    price: 4.99,
    description:
      "A refreshing blend of orange, lemon, and lime juices with a touch of mint.",
  },
  {
    name: "Tropical Mango Smoothie",
    image: "https://utfs.io/f/19e22c31-fab5-4abc-a951-5896444202fe-n5kdc4.png",
    category: "drinks" as ProductCategory,
    price: 4.99,
    description: "Ripe mangoes blended with coconut milk and a dash of lime.",
  },
  {
    name: "Strawberry Lime Mojito",
    image: "https://utfs.io/f/9bd15f04-85a1-4f38-9d14-149662bb519e-sd7ai2.png",
    category: "drinks" as ProductCategory,
    price: 4.99,
    description:
      "A non-alcoholic mojito with fresh strawberries, lime, and sparkling water.",
  },
  {
    name: "Mango Magic Smoothie",
    image: "https://utfs.io/f/a93d8cc5-e3b5-4ccf-802b-a5dea947592f-2z4rf.png",
    category: "drinks" as ProductCategory,
    price: 4.99,
    description: "A creamy smoothie made with mango, banana, and yogurt.",
  },
  {
    name: "Berry Breakfast Smoothie",
    image: "https://utfs.io/f/0f974546-a61c-45e9-b7f2-290b017424c4-1d6eu1.png",
    category: "drinks" as ProductCategory,
    price: 5.99,
    description:
      "A nutritious smoothie with mixed berries, oats, and almond milk.",
  },
];

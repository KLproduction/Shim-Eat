import ProductCategoryMenu from "./ProductCategoryMenu";
import { Product } from "@prisma/client";

type TMenuProps = {
  products: Product[] | null | undefined;
};

const DrinkMenu = ({ products }: TMenuProps) => {
  const drinks = products?.filter((product) => product.category === "drinks");
  const categoryName = drinks?.forEach((drink) => drink.category);

  return <ProductCategoryMenu menuItems={drinks!} categoryName="drinks" />;
};

export default DrinkMenu;

import ProductCategoryMenu from "./ProductCategoryMenu";
import { Product } from "@prisma/client";

type TMenuProps = {
  products: Product[] | null | undefined;
};

const DrinkMenu = ({ products }: TMenuProps) => {
  const drinks = products?.filter((product) => product.category === "drinks");
  const categoryName = drinks?.forEach((drink) => drink.category);

  return (
    <div className="mb-14 sm:mb-0">
      <ProductCategoryMenu menuItems={drinks!} categoryName="drinks" />
    </div>
  );
};

export default DrinkMenu;

import ProductCategoryMenu from "./ProductCategoryMenu";
import { Product } from "@prisma/client";

type TMenuProps = {
  products: Product[] | null | undefined;
};

const SaladMenu = ({ products }: TMenuProps) => {
  const salads = products?.filter((product) => product.category === "salad");
  const categoryName = salads?.forEach((salad) => salad.category);

  return <ProductCategoryMenu menuItems={salads!} categoryName="salad" />;
};

export default SaladMenu;

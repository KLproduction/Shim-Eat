import ProductCategoryMenu from "./ProductCategoryMenu";
import { Product } from "@prisma/client";

type TMenuProps = {
  products: Product[] | null | undefined;
};

const MainMenu = ({ products }: TMenuProps) => {
  const mains = products?.filter((product) => product.category === "main");
  const categoryName = mains?.forEach((main) => main.category);

  return <ProductCategoryMenu menuItems={mains!} categoryName="main" />;
};

export default MainMenu;

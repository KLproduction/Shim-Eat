import { getOnSaleProducts } from "@/data/getOnsaleProducts";
import { useQuery } from "@tanstack/react-query";

export const useMenu = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      return await getOnSaleProducts();
    },
    staleTime: 1000 * 60 * 60,
  });

  return { data, isFetching };
};

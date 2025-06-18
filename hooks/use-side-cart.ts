import { useQueryState, parseAsBoolean } from "nuqs";

export const useSideCart = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "side-cart",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};

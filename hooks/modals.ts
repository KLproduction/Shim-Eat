import { parseAsBoolean, useQueryState } from "nuqs";

export const useSignInModel = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "sign-in",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};

export const useSignUpModel = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "sign-up",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};

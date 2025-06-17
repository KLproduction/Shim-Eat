import { useMedia } from "react-use";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const ResponsiveModel = ({ children, isOpen, onOpenChange }: Props) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);
  // const isDesktop = true;
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogTitle>
        <DialogContent className="hide-scrollbar z-[9999] max-h-[85vh] w-full overflow-y-auto border-none p-0 sm:max-w-lg">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTitle>
        <DialogDescription></DialogDescription>
      </DrawerTitle>
      <DrawerContent>
        <div className="hide-scrollbar z-[99999] max-h-[70vh] overflow-y-auto pb-24">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModel;

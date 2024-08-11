import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CustomButton } from "./CustomButton";

type DeleteConfirmDialogProps = {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  deleteLoading: boolean;
  functionDelete: () => void;
};

export const DeleteConfirmDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  deleteLoading,
  functionDelete,
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DialogContent className="min-w-[780px] max-lg:min-w-[90%] max-lg:max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Deletar Ativo</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar este ativo?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="max-sm:grid max-sm:gap-3 col-span-full">
          <DialogClose className="px-4 py-2 bg-gray-200 font-bold text-sm rounded hover:bg-gray-300 transition">
            Cancelar
          </DialogClose>
          <CustomButton
            variant="destructive"
            isLoading={deleteLoading}
            onclick={functionDelete}
          >
            Deletar
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

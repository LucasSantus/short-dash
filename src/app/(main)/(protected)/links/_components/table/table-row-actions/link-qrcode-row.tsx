import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ScanQrCodeIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Fragment, useState } from "react";

interface LinkQrCodeRowProps {
  originalUrl: string;
}

export function LinkQrCodeRow({ originalUrl }: LinkQrCodeRowProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <DropdownMenuItem
        onSelect={(event) => {
          event.preventDefault();

          setIsOpen(true);
        }}
        className="flex items-center gap-2"
        icon={<ScanQrCodeIcon className="size-4" />}
      >
        Gerar QrCode
      </DropdownMenuItem>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code Preview</DialogTitle>
          </DialogHeader>

          <div className="flex justify-center items-center bg-muted/10 p-4 border rounded-md">
            <QRCodeSVG value={originalUrl} size={128} />
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

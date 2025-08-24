import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ContactDetail({ isOpen, setIsOpen, contact }) {
  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Detail</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            <strong>Name: </strong> {contact.name}
          </p>
          <p>
            <strong>Phone: </strong>
            {contact.phone}
          </p>
          <p>
            <strong>Email: </strong>
            {contact.email}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

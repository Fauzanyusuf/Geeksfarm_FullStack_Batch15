import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function ContactCard({ contact, onEdit, onDelete, onClick }) {
  return (
    <Card
      className="transition cursor-pointer hover:shadow-lg"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>{contact.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{contact.phone}</p>
        <p className="text-sm text-gray-600">{contact.email}</p>
      </CardContent>
      <CardFooter
        className="flex justify-end gap-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

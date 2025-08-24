import ContactCard from "@/components/ContactCard";
import ContactDetail from "@/components/ContactDetail";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { deleteContact, getContacts } from "@/services/contactService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  async function loadContacts() {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      toast.error("Failed to load contact data.", err);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  function handleEdit(contact) {
    setEditingContact(contact);
    setIsFormOpen(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(id);
        toast.success("The contact was deleted successfully.");
        loadContacts();
      } catch (err) {
        toast.error("Failed to delete the contact.", err);
      }
    }
  }

  function handleDetail(contact) {
    setSelectedContact(contact);
    setIsDetailOpen(true);
  }

  function handleFormSuccess() {
    setIsFormOpen(false);
    setEditingContact(null);
    loadContacts();
  }

  return (
    <div className="container px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Contact List</h1>
        <Button
          onClick={() => {
            setEditingContact(null);
            setIsFormOpen(true);
          }}
        >
          Add Contact
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={() => handleEdit(contact)}
            onDelete={() => handleDelete(contact.id)}
            onClick={() => {
              handleDetail(contact);
            }}
          />
        ))}
      </div>

      <ContactForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        contact={editingContact}
        onSuccess={handleFormSuccess}
      />

      <ContactDetail
        isOpen={isDetailOpen}
        setIsOpen={setIsDetailOpen}
        contact={selectedContact}
      />
    </div>
  );
}

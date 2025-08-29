import UserForm from "@/components/UserForm";

export default function FormPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100dvh-60px)] bg-background">
      <div className="container px-4 mx-auto lg:px-32">
        <UserForm />
      </div>
    </div>
  );
}

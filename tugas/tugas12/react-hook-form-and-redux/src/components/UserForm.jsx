// Import berbagai komponen UI dan hook yang digunakan untuk form
import { saveUserData } from "@/features/user/userSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";

// Pilihan untuk select dan checkbox pada form
const EDUCATION_OPTIONS = [
  "SD",
  "SMP",
  "SMA/SMK",
  "Diploma 1 (D1)",
  "Diploma 2 (D2)",
  "Diploma 3 (D3)",
  "Diploma 4 (D4) / Sarjana (S1)",
  "Magister (S2)",
  "Doktor (S3)",
];

const EXPERTISE_OPTIONS = ["HTML", "CSS", "JavaScript", "NodeJS", "React"];
const TECHNOLOGY_OPTIONS = ["Front End", "Back End", "Full Stack"];

// Komponen input text yang reusable untuk form
function TextInputField({ name, label, placeholder, control }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Komponen field untuk memilih expertise (checkbox multi select)
function ExpertiseField({ control }) {
  return (
    <FormField
      control={control}
      name="expertise"
      render={() => (
        <FormItem>
          <FormLabel>Expertise</FormLabel>
          <div className="grid grid-cols-2 gap-y-2">
            {EXPERTISE_OPTIONS.map((tech) => (
              <FormField
                key={tech}
                control={control}
                name="expertise"
                render={({ field }) => {
                  // Handler untuk menambah/menghapus item dari array expertise
                  const handleChange = (checked) => {
                    const newValue = checked
                      ? [...field.value, tech]
                      : field.value.filter((v) => v !== tech);
                    field.onChange(newValue);
                  };
                  return (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(tech)}
                          onCheckedChange={handleChange}
                        />
                      </FormControl>
                      <FormLabel className="mb-0">{tech}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  );
}

// Komponen utama UserForm untuk input data user
export default function UserForm() {
  // Inisialisasi form dengan react-hook-form
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      employed: false,
      education: "",
      expertise: [],
      preferredTechnology: "",
      notes: "",
    },
  });

  // Ambil dispatch dari redux untuk menyimpan data user
  const dispatch = useDispatch();
  // Watch semua nilai form untuk preview
  const watchedValues = form.watch();

  // Handler submit form
  function onSubmit(values) {
    // Simpan data ke redux
    dispatch(saveUserData(values));

    // Format data untuk notifikasi
    const formatted = Object.entries(values)
      .map(
        ([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`
      )
      .join("\n");

    // Tampilkan toast sukses
    toast.success("Form submitted!", {
      description: formatted,
    });
  }

  // Render form dengan dua kolom (responsive)
  return (
    <Card className="w-full max-w-7xl mx-auto mt-6 shadow-lg px-6">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        <CardDescription>
          Please fill out the form below. Fields are divided into two sections
          for easier navigation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Kolom kiri: data dasar user */}
            <div className="space-y-4">
              <TextInputField
                name="firstName"
                label="First Name"
                placeholder="e.g. John"
                control={form.control}
              />
              <TextInputField
                name="lastName"
                label="Last Name"
                placeholder="e.g. Doe"
                control={form.control}
              />
              <TextInputField
                name="email"
                label="Email"
                placeholder="john.doe@example.com"
                control={form.control}
              />

              {/* Checkbox employed */}
              <FormField
                control={form.control}
                name="employed"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormLabel className="mb-0">Employed</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <span className="text-sm text-muted-foreground">
                      {field.value ? "Yes" : "No"}
                    </span>
                  </FormItem>
                )}
              />

              {/* Select education */}
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Education" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Education</SelectLabel>
                          {EDUCATION_OPTIONS.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Kolom kanan: expertise, teknologi, notes, submit */}
            <div className="space-y-4">
              <ExpertiseField control={form.control} />

              {/* Radio group preferred technology */}
              <FormField
                control={form.control}
                name="preferredTechnology"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Technology</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-2"
                      >
                        {TECHNOLOGY_OPTIONS.map((role) => (
                          <FormItem
                            key={role}
                            className="flex items-center gap-2"
                          >
                            <FormControl>
                              <RadioGroupItem value={role} />
                            </FormControl>
                            <FormLabel className="mb-0">{role}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Textarea notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Notes..."
                        className="resize-none h-28"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tombol submit dan tombol reset*/}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={form.formState.isSubmitting}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => form.reset()}
                  disabled={form.formState.isSubmitting}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Form>

        {/* Preview data form secara realtime */}
        <pre className="mt-6 p-4 bg-muted rounded-lg text-sm text-foreground overflow-auto">
          {JSON.stringify(watchedValues, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}

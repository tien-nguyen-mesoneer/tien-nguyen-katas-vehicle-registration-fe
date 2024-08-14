import { ReactNode, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Separator } from "./ui/separator";
import CodeGenerator from "./code-generator";
import { faker } from "@faker-js/faker";
import { Gender, IRegistration } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/auth-context";
import { fetchData } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const VehicleRegistrationFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z]+$/, "Only alphabetical characters are allowed"),
  lastName: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z]+$/, "Only alphabetical characters are allowed"),
  dob: z.string(),
  email: z.string().trim().email(),
  gender: z.enum([Gender.FEMALE, Gender.MALE]).optional(),
  address: z.string().trim().optional(),
  phone: z
    .string()
    .length(10)
    .regex(/^\d+$/, "Only numeric characters are allowed")
    .optional(),
});

function VehicleRegistrationForm() {
  const [code, setCode] = useState("");
  const [isReadOnly, setReadOnly] = useState(false);

  const form = useForm<z.infer<typeof VehicleRegistrationFormSchema>>({
    resolver: zodResolver(VehicleRegistrationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: undefined,
      email: "",
      gender: undefined,
      address: undefined,
      phone: undefined,
    },
  });

  async function handleGenerateCode() {
    // Reset form state
    form.clearErrors();

    // Trigger validation on required fields
    await form.trigger("firstName");
    await form.trigger("lastName");
    await form.trigger("dob");
    await form.trigger("email");

    await form.trigger("gender");
    await form.trigger("address");
    await form.trigger("phone");

    const isFirstNameValid =
      !form.getFieldState("firstName").invalid &&
      form.getFieldState("firstName").isDirty;
    const isLastNameValid =
      !form.getFieldState("lastName").invalid &&
      form.getFieldState("lastName").isDirty;
    const isDobValid =
      !form.getFieldState("dob").invalid && form.getFieldState("dob").isDirty;
    const isEmailValid =
      !form.getFieldState("email").invalid &&
      form.getFieldState("email").isDirty;

    // 1. Check if required fields are filled and validated
    if (!(isFirstNameValid && isLastNameValid && isDobValid && isEmailValid)) {
      form.setError("root", {
        message:
          "Must fill the required fields before generating a Vehicle Code",
      });
      return;
    }

    if (JSON.stringify(form.formState.errors) !== "{}") {
      return;
    }
    // 2. Generate code
    setCode(faker.vehicle.vrm());

    // 3. Form is disabled after generating the code
    setReadOnly(true);
  }

  return (
    <div className="h-full max-w-xl p-6 space-y-6 border-r overflow-y-scroll no-scrollbar">
      <div>
        <p className="text-lg font-medium">Registration Form</p>
        <p className="text-sm text-muted-foreground">
          Fill the below fields to register your vehicle
        </p>
        <Separator className="mt-5" />
      </div>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <FormMessage>{form.formState.errors.root?.message}</FormMessage>

          <fieldset disabled={isReadOnly} className="space-y-2.5">
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First name (*)</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="John"
                        {...field}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last name (*)</FormLabel>
                    <FormControl>
                      <Input required placeholder="W. Doe" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                        <SelectItem value={Gender.MALE}>Male</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth (*)</FormLabel>
                  <FormControl>
                    <Input required type="date" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (*)</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="120 Westminton St., DC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+84 000 000" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Vehicle Registration Number (*)</FormLabel>
              <CodeGenerator code={code} onClick={handleGenerateCode} />
            </div>
          </fieldset>

          <VehicleRegistrationConfirmDialog
            registration={{ ...form.getValues(), code }}
            renderDialogTrigger={({ isConfirmed }) => (
              <Button
                type="submit"
                className="w-full"
                // Disable submit btn If user had confirmed or user hadn't fill form
                disabled={!isReadOnly || isConfirmed}
              >
                {isConfirmed ? "Submitted" : "Submit"}
              </Button>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

type VehicleRegistrationConfirmDialogProps = {
  registration: IRegistration;
  renderDialogTrigger?: ({
    isConfirmed,
  }: {
    isConfirmed: boolean;
  }) => ReactNode;
  onConfirm?: VoidFunction;
};

const VehicleRegistrationConfirmDialog = ({
  registration,
  renderDialogTrigger,
  onConfirm,
}: VehicleRegistrationConfirmDialogProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmInformation = async () => {
    // 1. Create a vehicle registration request at POST:/vehicles
    try {
      const data = await fetchData("/vehicles", "POST", {
        body: JSON.stringify(registration),
      });

      if (data.success) {
        // 2. Update state to mark the dialog is confirmed
        setIsConfirmed(true);
        // 3. Do anything as user has comfirmed the dialog
        onConfirm?.();
      }
    } catch (error) {
      // TODO: Handle error with a toaster
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {renderDialogTrigger ? (
          renderDialogTrigger({
            isConfirmed: isConfirmed,
          })
        ) : (
          <Button>Open</Button>
        )}
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle>Please verify your registration</DialogTitle>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="font-medium">First Name:</div>
            <div>{registration.firstName}</div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="font-medium">Last Name:</div>
            <div>{registration.lastName}</div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="font-medium">Date of Birth:</div>
            <div>{registration.dob}</div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="font-medium">Email:</div>
            <div>{registration.email}</div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="font-medium">Addrress:</div>
            <div>{registration.address || "none"}</div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="font-medium">Phone:</div>
            <div>{registration.phone || "none"}</div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="font-medium">Vehicle Code:</div>
            <div>{registration.code}</div>
          </div>
        </div>
        <div className="space-x-2 flex justify-end">
          <DialogClose asChild>
            <Button size="sm" onClick={handleConfirmInformation}>
              Confirm
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleRegistrationForm;

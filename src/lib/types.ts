import { VehicleRegistrationFormSchema } from "@/components/vehicle-registration-form";
import { z } from "zod";

export type IVehicle = {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: Gender;
  address?: string;
  phone?: string;
  code: string;
  status: VehicleStatus;
};

export interface IRegistration
  extends z.infer<typeof VehicleRegistrationFormSchema> {
  code: string;
}

export type IUser = {
  _id: string;
  role: UserRole;
  email: string;
};

export type KataResponse = {
  success: boolean;
  message: string;
  data: any;
};

export enum UserRole {
  GENERAL = "GENERAL",
  POLICE = "POLICE",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum VehicleStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

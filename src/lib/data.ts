import { UserRole } from "./types";
import JohnDoeImg from "@/assets/avatar-01.svg";
import PoliceImg from "@/assets/avatar-02.svg";

export const MOCK_USERS = {
  GENERAL: {
    _id: "66baf0142a2ee0a83fe97207",
    role: UserRole.GENERAL,
    email: "a@gmail.com",
    img: JohnDoeImg,
    vehicle: undefined,
    firstName: undefined,
    lastName: undefined,
    gender: undefined,
    dob: undefined,
    address: undefined,
    phone: undefined,
  },
  POLICE: {
    _id: "66baf0832a2ee0a83fe97208",
    role: UserRole.POLICE,
    email: "b@gmail.com",
    img: PoliceImg,
    vehicle: undefined,
    firstName: undefined,
    lastName: undefined,
    gender: undefined,
    dob: undefined,
    address: undefined,
    phone: undefined,
  },
};

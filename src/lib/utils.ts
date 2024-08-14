import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { KataResponse } from "./types";

// A util used to merge strings of classname
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchData(
  endpoint: string,
  method: string = "GET",
  options: RequestInit = {}
): Promise<KataResponse> {
  try {
    // Default options for fetch
    const defaultOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}${endpoint}`,
      defaultOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    // Re-throw the error to allow the caller to handle it
    throw error;
  }
}

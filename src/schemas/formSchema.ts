import { disallowedDomains } from "@/helpers/disallowedDomains";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import * as z from "zod";
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
}
class Trie {
  root: TrieNode = new TrieNode();

  insert(word: string): void {
    let current = this.root;
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }
    current.isEndOfWord = true;
  }

  search(word: string): boolean {
    let current = this.root;
    for (const char of word) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }
    return current.isEndOfWord;
  }
}
// Initialize trie with disallowed domains
const disallowedDomainsTrie = new Trie();
disallowedDomains.forEach((domain) => disallowedDomainsTrie.insert(domain));
//Form schema array

// An array of schemas, each index in the array corresponds to the schema for each steps in the form
export const formValidationSchema = [
  // start step
  // z.object({}),
  //Profile info
  z.object({
    firstName: z
      .string({ required_error: "First name is required" })
      .refine((data) => data.trim() !== "", {
        message: "First name is required",
      }),
    lastName: z
      .string({ required_error: "Last name is required" })
      .refine((data) => data.trim() !== "", {
        message: "Last name is required",
      }),
    dateOfBirth: z.date({
      required_error: "Date of birth is required",
      message: "Date of birth is required",
    }),
    phoneNumber: z
      .string({ required_error: "Phone number is required" })
      .refine((data) => data.trim() !== "", {
        message: "Phone number is required",
      })
      .transform((phone) => {
        // If the phone number doesn't start with '+', add '+1'
        if (!phone.startsWith("+")) {
          phone = "+1" + phone;
        }
        return phone;
      })
      .refine(
        (phone) => {
          try {
            // Check if the phone number is valid
            if (
              !isValidPhoneNumber(phone, "US") &&
              !isValidPhoneNumber(phone, "CA")
            ) {
              return false;
            }

            // Parse the phone number
            const parsedNumber = parsePhoneNumber(phone, "US");

            // Additional checks
            return (
              parsedNumber.isValid() &&
              (parsedNumber.getType() === "MOBILE" ||
                parsedNumber.getType() === "FIXED_LINE_OR_MOBILE")
            );
          } catch (error) {
            return false;
          }
        },
        {
          message:
            "Invalid phone number. Please enter a valid US or Canadian mobile number.",
        }
      ),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" })
      .refine((data) => data.trim() !== "", {
        message: "Email is required",
      })
      .refine((email) => {
        // Basic email format validation
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
      }, "Invalid email format")
      .refine((email) => {
        const parts = email.split("@");
        if (parts.length !== 2) return false; // Invalid email format
        const domain = parts[1].toLowerCase();
        return !disallowedDomainsTrie.search(domain);
      }, "We can't accept email addresses from this domain.")
      .refine((email) => {
        // Additional checks
        return email.length <= 254; // Maximum total length
      }, "Email is too long")
      .refine((email) => {
        const [local, domain] = email.split("@");
        return local.length <= 64; // Maximum local part length
      }, "Local part of email is too long")
      .refine((email) => {
        // No consecutive dots
        return !email.includes("..");
      }, "Email cannot contain consecutive dots")
      .refine((email) => {
        // Check for valid characters in local part
        const localPart = email.split("@")[0];
        return /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(localPart);
      }, "Email contains invalid characters"),

    preferredContact: z
      .string({ required_error: "Select preferred contact method" })
      .refine((data) => data.trim() !== "", {
        message: "Select preferred contact method",
      }),
  }),

  // Contact info
  z.object({
    streetAddress: z
      .string({ required_error: "Street address is required" })
      .refine((data) => data.trim() !== "", {
        message: "Street address is required",
      }),
    city: z
      .string({ required_error: "Street address is required" })
      .refine((data) => data.trim() !== "", {
        message: "Street address is required",
      }),
    stateProvince: z
      .string({ required_error: "Province/state is required" })
      .refine((data) => data.trim() !== "", {
        message: "Province/state is required",
      }),
    postalZipCode: z
      .string({ required_error: "Postal code is required" })
      .refine((data) => data.trim() !== "", {
        message: "Postal code is required",
      }),
    country: z
      .string({ required_error: "Country is required" })
      .refine((data) => data.trim() !== "", {
        message: "Country is required",
      }),
  }),
  // Product selection
  z.object({
    selectedProducts: z
      .array(z.any())
      .min(1, { message: "Select at least a product" }),
  }),
  //Payment
  z.object({
    isPaid: z.boolean().optional(),
  }),
  //Allergies
  z.object({
    allergies: z.enum(["yes", "no"], { message: "Select an option" }),
    currentMedications: z.enum(["yes", "no"], { message: "Select an option" }),
    allergiesDetails: z.string().optional(),
    medicationsDetails: z.string().optional(),
  }),
  //Medical history step one
  z.object({
    existingConditions: z.enum(["yes", "no"], { message: "Select an option" }),
    previousSurgeries: z.enum(["yes", "no"], { message: "Select an option" }),
    conditionsDetails: z.string().optional(),
    surgeriesDetails: z.string().optional(),
  }),
  //Medical history step two
  z.object({
    heartDisease: z.enum(["yes", "no"], { message: "Select an option" }),
    kidneyDisease: z.enum(["yes", "no"], { message: "Select an option" }),
    liverDisease: z.enum(["yes", "no"], { message: "Select an option" }),
    heartDiseaseDetails: z.string().optional(),
    kidneyDiseaseDetails: z.string().optional(),
    liverDiseaseDetails: z.string().optional(),
  }),
  //Medical history step three
  z.object({
    autoimmuneDisorders: z.enum(["yes", "no"], { message: "Select an option" }),
    otherConditions: z.enum(["yes", "no"], { message: "Select an option" }),
    autoimmuneDisordersDetails: z.string().optional(),
    otherConditionsDetails: z.string().optional(),
  }),
  //Health update
  z.object({
    lastCheckupDate: z.date({
      required_error: "Date of last checkup is required",
    }),
    recentHealthChanges: z.enum(["yes", "no"], { message: "Select an option" }),
    healthChangesDetails: z.string().optional(),
  }),
  //Additional Information step one
  z.object({
    lastCheckupDate: z.date({
      required_error: "Date of last checkup is required",
    }),
    concernsInjectables: z.enum(["yes", "no"], { message: "Select an option" }),
    injectablesConcernsDetails: z.string().optional(),
    needleFear: z.enum(["yes", "no"], { message: "Select an option" }),
    needleConcernsDetails: z.string().optional(),
  }),
  //Additional Information step two
  z.object({
    familyMedicalHistory: z
      .string({ required_error: "Family medical history is required" })
      .refine((data) => data.trim() !== "", {
        message: "Family medical history is required",
      }),
    additionalInfo: z.string().optional(),
  }),

  //consent
  z.object({
    consentAgreement: z
      .boolean({ required_error: "You must agree to the consent" })
      .refine((data) => data === true, {
        message: "You must agree to the consent",
      }),
  }),
];

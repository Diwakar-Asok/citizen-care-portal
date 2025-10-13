import type { FormState } from "../types/form";

export async function submitForm(data: FormState) {
  // mock endpoint
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate mock success response
  return {
    status: 200,
    message: "Form submitted successfully",
    data,
  };
}

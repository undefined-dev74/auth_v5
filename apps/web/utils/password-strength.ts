// This function checks if the given string has at least one number
const hasNumber = (number: string): boolean => new RegExp(/[0-9]/).test(number);

// This function checks if the given string has both lowercase and uppercase characters
const hasMixed = (number: string): boolean =>
  new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// This function checks if the given string has at least one special character
const hasSpecial = (number: string): boolean => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// This function takes a strength count and returns the corresponding label and color
export const strengthColor = (count: number): { label: string; color: string } => {
  if (count < 2) return { label: "Poor", color: "#ef4444" }; // red-500
  if (count < 3) return { label: "Weak", color: "#eab308" }; // yellow-500
  if (count < 4) return { label: "Normal", color: "#fde047" }; // yellow-300
  if (count < 5) return { label: "Good", color: "#22c55e" }; // green-500
  if (count < 6) return { label: "Strong", color: "#15803d" }; // green-700
  return { label: "Poor", color: "#ef4444" }; // red-500
};

// This function takes a password string and returns the strength count
export const strengthIndicator = (number: string): number => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};

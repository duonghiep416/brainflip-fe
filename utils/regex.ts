export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// This pattern will match passwords that:
// Are at least 6 characters long
// Contain at least one letter (A-Z or a-z)
// Contain at least one number (0-9)
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

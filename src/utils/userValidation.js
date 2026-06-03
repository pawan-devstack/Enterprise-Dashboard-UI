export const validateUser = (
  name,
  email,
  users,
  currentUserId = null
) => {
  if (!name.trim() || !email.trim()) {
    return "All fields are required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Enter valid email";
  }

  const emailExists = users.some(
    (user) =>
      user.id !== currentUserId &&
      user.email?.toLowerCase() ===
      email.toLowerCase()
  );

  if (emailExists) {
    return "Email already exists";
  }

  return null;
};
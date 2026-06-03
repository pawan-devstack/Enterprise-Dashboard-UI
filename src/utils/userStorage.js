export const saveUsersToStorage = (users) => {
  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );
};

export const getUsersFromStorage = () => {
  try {
    const storedUsers = localStorage.getItem("users");

    if (!storedUsers) return null;

    const parsedUsers = JSON.parse(storedUsers);

    return Array.isArray(parsedUsers)
      ? parsedUsers
      : null;
  } catch {
    localStorage.removeItem("users");
    return null;
  }
};
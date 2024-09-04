export const isValidEmail = (email: string) => {
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
    return regex.test(email);
  }
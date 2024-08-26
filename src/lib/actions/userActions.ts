export const loginAction = (userData: any) => ({
  type: "LOGIN_SUCCESS",
  payload: userData,
});

export const logoutAction = () => ({
  type: "LOGOUT",
});

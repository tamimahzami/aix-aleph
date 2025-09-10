import { api } from "./api";

export const auth = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (name, email, password) =>
    api.post("/auth/register", { name, email, password }),
  me: (token) => api.get("/auth/me", { token }),
  logout: (token) => api.post("/auth/logout", {}, { token }),
};

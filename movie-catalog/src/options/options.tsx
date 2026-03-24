const TOKEN = import.meta.env.VITE_API_TOKEN;

export const optionsGet = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

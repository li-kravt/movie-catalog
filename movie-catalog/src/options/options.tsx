const TOKEN = import.meta.env.VITE_API_TOKEN;

export const optionsGet = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

export const optionsPost = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

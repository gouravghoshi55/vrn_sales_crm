const API_URL = "https://script.google.com/macros/s/AKfycby9tAJ2QOnJcl5bUM1c3cdopSpK0TCWx-V18t5OCfwDCkINtMJm0V4FS9wQ_V8uks5R/exec";

export const login = async (email, password) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      email,
      password
    }),
  });
  return res.json();
};

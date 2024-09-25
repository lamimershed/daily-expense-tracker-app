import axios from "axios";

const API_KEY = import.meta.env.VITE_CHATGPT_API_KEY;

const openai = axios.create({
  baseURL: "https://api.openai.com/v1/chat",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getOpenAIResponse = async (prompt: string) => {
  const response = await openai.post("/completions", {
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 150,
  });
  return response.data;
};

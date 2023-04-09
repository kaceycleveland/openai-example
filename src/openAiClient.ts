import { Configuration, OpenAIApi } from "openai";

console.log(import.meta.env.VITE_OPENAI_ORG);

const createOpenAiClient = () => {
  const config = new Configuration({
    organization: import.meta.env.VITE_OPENAI_ORG,
    apiKey: import.meta.env.VITE_OPENAI_KEY,
  });

  return new OpenAIApi(config);
};

export const openAiClient = createOpenAiClient();

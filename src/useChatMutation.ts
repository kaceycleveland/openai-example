import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { openAiClient } from "./openAiClient";
import {
  CreateChatCompletionResponse,
  CreateChatCompletionRequest,
} from "openai";
import { AxiosResponse } from "axios";

export const useChatMutation = (
  options?: UseMutationOptions<
    AxiosResponse<CreateChatCompletionResponse>,
    unknown,
    CreateChatCompletionRequest
  >
) => {
  return useMutation<
    AxiosResponse<CreateChatCompletionResponse>,
    unknown,
    CreateChatCompletionRequest
  >({
    mutationFn: (request) => {
      return openAiClient.createChatCompletion(request);
    },
    ...options,
  });
};

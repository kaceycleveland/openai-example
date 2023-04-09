import { ChatCompletionRequestMessage } from "openai/dist/api";
import { useState, useCallback, useRef } from "react";
import { useChatMutation } from "./useChatMutation";

function App() {
  // Store the recieved messages and use them to continue the conversation with the OpenAI Client
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Use the chat mutation hook to submit the request to OpenAI
   * This is a basic example, but using tanstack query lets you easily
   * render loading, error, and success states.
   *  */

  const { mutateAsync: submitChat } = useChatMutation({
    onSuccess: (response) => {
      const foundMessage = response.data.choices.length
        ? response.data.choices[0].message
        : undefined;
      if (foundMessage) {
        const messageBody: ChatCompletionRequestMessage[] = [
          ...messages,
          foundMessage,
        ];
        setMessages(messageBody);
      }
    },
  });

  const handleSubmit = useCallback(() => {
    if (inputRef.current?.value) {
      const messageBody: ChatCompletionRequestMessage[] = [
        ...messages,
        { role: "user", content: inputRef.current?.value },
      ];
      setMessages(messageBody);
      // For simplicility, the settings sent to OpenAI are hard coded here.
      submitChat({
        model: "gpt-3.5-turbo",
        max_tokens: 100,
        presence_penalty: 1,
        frequency_penalty: 1,
        messages: messageBody,
      });
    }
  }, [messages]);

  return (
    <div className="App">
      <div>
        {messages.map((message) => {
          return (
            <div>
              <div>{message.role}</div>
              <div>{message.content}</div>
            </div>
          );
        })}
      </div>
      <div className="card">
        <textarea ref={inputRef}></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;

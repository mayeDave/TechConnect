import { useState } from "react";
import { Send } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import ReactMarkdown from "react-markdown";

const AiPage = () => {
  const { authUser } = useAuthStore();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.post("/ai/ai-chat", { prompt });

      const data = res.data;
      const aiResponse = data.response.choices[0].message.content;

      // Update response with both user input and AI response in the chat style
      setResponse((prevResponse) => [
        ...prevResponse,
        { type: "user", text: prompt },
        { type: "ai", text: aiResponse },
      ]);

      setPrompt(""); // Clear input after sending
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 h-full">
      {/* AI Chat Responses */}
      <div className="w-full max-w-3xl p-4 border rounded-md bg-base-200 space-y-4 flex-1 overflow-hidden">
        {/* Chat container with fixed height and scrollable messages */}
        <div className="h-[calc(70vh-100px)] overflow-y-auto space-y-4">
          {loading && (
            <p className="text-sm text-center">Generating response...</p>
          )}
          {error && <p className="text-sm text-center text-error">{error}</p>}

          {/* Map through the responses and render each chat bubble */}
          {response.length === 0 && !loading && !error && (
            <>
              <h1 className="text-lg font-bold text-center">
                Hello, I am Maye, your AI assistant. I'm here to help with all
                things tech—whether you're looking for coding advice, debugging
                tips, or tech trends. Ask me anything, and let’s explore the
                digital world together!
              </h1>
              <p className="text-sm text-center text-gray-500">
                Responses will appear here.
              </p>
            </>
          )}

          {response.map((message, index) => (
            <div
              key={index}
              className={`chat ${
                message.type === "user" ? "chat-start" : "chat-end"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Avatar"
                    src={
                      message.type === "user"
                        ? authUser?.profilePicture || "/avatar.png" // User Avatar
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" // AI Avatar
                    }
                  />
                </div>
              </div>
              <div className="chat-bubble">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Prompt Input at the bottom */}
      <div className="w-full max-w-3xl flex flex-col gap-4 mt-4">
        <textarea
          className="textarea textarea-bordered w-full h-24 p-4 rounded-md"
          placeholder="Ask me anything..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>

        <button
          className="btn btn-primary w-full flex items-center justify-center gap-2"
          onClick={handleSendPrompt}
          disabled={loading}
        >
          {loading ? "Thinking..." : <Send size={20} />}
          {loading ? "" : "Send"}
        </button>
      </div>
    </div>
  );
};

export default AiPage;

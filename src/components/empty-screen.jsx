export default function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-4 rounded-lg border bg-background p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to Your AI Chatbot!</h1>
        <p className="text-lg leading-relaxed mb-4">
          It looks like you haven’t started a chat yet. Begin by selecting a chat from the sidebar or starting a new conversation.
        </p>
       
      </div>
    </div>
  );
}

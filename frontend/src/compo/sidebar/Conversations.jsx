import Conversation from "./Conversation";

function Conversations() {
  return (
    <div>
      <div className="py-2 flex flex-col overflow-auto">
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
    </div>
  );
}

export default Conversations;

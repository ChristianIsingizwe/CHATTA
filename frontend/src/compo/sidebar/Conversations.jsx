import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";

function Conversations() {
  const {loading, conversations} = useGetConversations();
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

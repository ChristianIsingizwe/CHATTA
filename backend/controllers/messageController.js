import Conversation from "../models/conversationModel";
import Message from "../models/messageModel";

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      Conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json({ message: "Sent new message." });
  } catch (error) {
    console.error("An error occurred: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getMessages = (req, res) =>{
    try {
        
    } catch (error) {
        console.error("An error occurred: ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export { sendMessage };

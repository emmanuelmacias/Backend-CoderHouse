import { MessagesModel } from "./models/message.model.js";

export default class MessagesDaoMongoDB {

  async getAllMessages() {
    try {
      const response = await MessagesModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createMessage(username, message) {
    try {
      const newMessage = await MessagesModel.create({
        username: username,
        message: message,
      });
      return newMessage;
    } catch (error) {
      console.log(error);
    }
  }

  async getMessageById(id) {
    try {
      const response = await MessagesModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

import {Router,Request,Response} from "express";
import {Message} from "../types/message";
import {mockUserDetails} from "../assets/mockUserDetails";
import {mockMessages} from "../assets/mockMessages";

export const messages = Router();
function addAuthorNameToMessages() {
    return mockMessages.map((message: Message) => {
        const author = mockUserDetails.find(user => user.id === message.authorId);
        const authorName = author && author.name;
        return {...message, authorName};
    });
}
messages.get('/', (req: Request, res: Response) => {
    res.send(addAuthorNameToMessages());
});

export default messages;

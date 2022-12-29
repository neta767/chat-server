import {Router, Request, Response} from "express";
import {Message} from "../types/message";
import {mockUserDetails} from "../assets/mockUserDetails";
import {mockMessages} from "../assets/mockMessages";
import bodyParser from 'body-parser';

export const messages = Router();

/**
 * transforms the messages so that they also include the author name
 */
function addAuthorNameToMessages(): Message[] {
    return mockMessages.map((message: Message) => {
        const author = mockUserDetails.find(user => user.id === message.authorId);
        const authorName = author && author.name;
        return {...message, authorName};
    });
}

/**
 * get the full list of messages
 */
messages.get('/', (req: Request, res: Response) => {
    res.send(addAuthorNameToMessages());
});

/**
 * adds a new message
 */
messages.post('/', bodyParser.json(), (req: Request, res: Response) => {
    const message: Message = req.body;
    mockMessages.push({
        ...message,
        likes: [],
        authorName: mockUserDetails.find(user => user.id === message.authorId).name
    })
    res.status(200).send()
});
/**
 * changes the "likes" array of a message
 */
messages.post('/:id', bodyParser.json(), (req: Request) => {
    const id = req.params?.id;
    const {userId, like} = req.body;
    const message = mockMessages.find(message => message.id === +id);
    like ? message.likes!.splice(message.likes!.indexOf(userId), 1) : message.likes!.push(userId);
});
export default messages;

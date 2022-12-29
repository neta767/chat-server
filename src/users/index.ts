import {Request, Response, Router} from "express";
import {mockUserDetails} from "../assets/mockUserDetails";
import {User} from "../types/user";

export const users = Router();

/**
 * reduce MockUserDetails to a list of id and name only
 */
function reduceUsers(): User[] {
    return mockUserDetails.reduce((accumulator, currentValue) => {
        accumulator.push({"name": currentValue.name, "id": currentValue.id});
        return accumulator;
    }, [])
}

/**
 * get the list of name+id of all the users
 */
users.get('/', (req: Request, res: Response) => {
    res.send(reduceUsers());
});

/**
 * get the full details of a user by their user ID
 */
users.get('/:id', (req: Request, res: Response) => {
    const id = req.params?.id;
    const user = mockUserDetails.find(user => user.id === +id);
    res.send(user);
});

export default users;

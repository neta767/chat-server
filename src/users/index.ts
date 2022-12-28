import {Request, Response, Router} from "express";
import {mockUserDetails} from "../assets/mockUserDetails";

export const users = Router();
function reduceUsers() {
    return mockUserDetails.reduce((accumulator, currentValue) => {
    accumulator.push({"name": currentValue.name, "id": currentValue.id});
    return accumulator;
}, [])
}
users.get('/', (req: Request, res: Response) => {
    res.send(reduceUsers());
});

export default users;

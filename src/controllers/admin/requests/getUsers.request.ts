import { User} from "@prisma/client";

export interface IGetUsersRes {
    users: User[]
}

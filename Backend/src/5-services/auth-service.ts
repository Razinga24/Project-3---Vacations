import { OkPacket } from "mysql";
import UserModel from "../2-models/user-model";
import dal from "../4-utils/dal";
import { UnauthorizedError, ValidationError } from "../2-models/client-errors";
import cyber from "../4-utils/cyber";
import CredentialsModel from "../2-models/credentials-model";
import RoleModel from "../2-models/role-model";

async function register(user: UserModel): Promise<string> {
    
    user.validate();

    const isExist = await isEmailExist(user.email);
    if (isExist) throw new ValidationError(`Email: ${user.email} already register`);

    user.roleId = RoleModel.User;
    user.password = cyber.hashPassword(user.password);

    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;
    const result: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId]);
    
    user.userId = result.insertId;
    const token = cyber.createToken(user);

    return token;
}




async function login(credentials: CredentialsModel): Promise<string> {

    credentials.validate();

    credentials.password = cyber.hashPassword(credentials.password);

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const users = await dal.execute(sql, [credentials.email, credentials.password]);
    const user = users[0];

    if (!user) throw new UnauthorizedError("Incorrect username or password");
    const token = cyber.createToken(user);

    return token;

}

async function isEmailExist(email: string): Promise<boolean> {
    const sql = `SELECT EXISTS (SELECT * FROM users WHERE email = ?) AS isExist`;
    const result: OkPacket = await dal.execute(sql, [email]);
    const isExist = result[0].isExist;

    return isExist === 1;
}

export default { register, login };

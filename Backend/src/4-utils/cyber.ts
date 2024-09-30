import { Request } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import UserModel from "../2-models/user-model";
import { UnauthorizedError } from "../2-models/client-errors";

const secretKey = "VacationProject";

function hashPassword(plainText: string): string {
    const salt = "TheVacationSite";
    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");
    return hashedText;
}

function comparePassword(plainText: string, hashedText: string): boolean {
    const salt = "TheVacationSite";
    const hashedPlainText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");
    return hashedPlainText === hashedText;
}

function createToken(user: UserModel): string {
    delete user.password;

    const container = { user };
    const options = { expiresIn: "60d" }
    const token = jwt.sign(container, secretKey, options);

    return token;
}

async function verifyToken(request: Request): Promise<UserModel> {
    return new Promise((resolve, reject) => {
        const header = request.header("authorization");
        if (!header) reject(new UnauthorizedError("Unauthorized"));

        const token = header.replace("Bearer ", "");
        if (!token) reject(new UnauthorizedError("Missing Token"));

        jwt.verify(token, secretKey, (err, container: { user: UserModel }) => {
            if (err) {
                reject(new UnauthorizedError("Invalid token"));
            }
            resolve(container.user);
        });
    });
}

export default {
    createToken,
    verifyToken,
    hashPassword,
    comparePassword
};
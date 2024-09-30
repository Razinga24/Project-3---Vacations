import { OkPacket } from "mysql";
import dal from "../4-utils/dal"
import FollowerModel from "../2-models/follower-model";
import { ResourceNotFoundError } from "../2-models/client-errors";


async function addFollow(userId: number, vacationId: number): Promise<void> {

    const sql = `INSERT INTO followers VALUES(?, ?)`;
    await dal.execute(sql, [userId, vacationId]);

};

async function deleteFollow(userId: number, vacationId: number): Promise<void> {

    const sql = `DELETE FROM followers WHERE userId = ? AND vacationId = ?`;
    const result: OkPacket = await dal.execute(sql, [userId, vacationId]);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId || userId);
};

async function isUserFollowing(userId: number, vacationId: number): Promise<boolean> {
    const sql = `SELECT 1 FROM followers WHERE userId = ? AND vacationId = ? LIMIT 1`;
    const result = await dal.execute(sql, [userId, vacationId]);
    return result.length > 0;
}


export default {
    addFollow,
    deleteFollow,
    isUserFollowing
}
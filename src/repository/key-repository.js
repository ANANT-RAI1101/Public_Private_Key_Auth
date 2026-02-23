const { UserKey } = require("../models/index")
const CrudRepository = require("./crud-repository")


class KeyRepository extends CrudRepository {
    constructor() {
        super(UserKey)
    }

    async findOne(userId, deviceName) {
        try {
            const response = await UserKey.findOne({
                where: {
                    userId: userId,
                    deviceName: deviceName
                }
            })
            return response
        } catch (error) {
            throw new error
        }
    }
}

module.exports = KeyRepository
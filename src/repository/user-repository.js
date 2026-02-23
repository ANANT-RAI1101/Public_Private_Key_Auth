const { user } = require("../models")
const CrudRepository = require("./crud-repository")


class UserRepository extends CrudRepository {
    constructor() {
        super(user)
    }

}

module.exports = UserRepository
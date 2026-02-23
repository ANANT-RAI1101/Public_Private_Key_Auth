const UserKey =require("../models/userkey")
const CrudRepository =require("./crud-repository")


class KeyRepository extends CrudRepository{
    constructor(){
        super(UserKey)
    }
    
}

module.exports=KeyRepository
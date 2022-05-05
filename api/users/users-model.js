const db = require("../../data/db-config.js")

const getUser = (user_id) => {
    const user = db("users").where({user_id}).first()
    return user
}

function findBy(filter){ 
    return db("users").where(filter).first()
}

async function createUser(user) {
    return db
        .insert(user)
        .into("users")
        .returning("*")
        .then(rows => {
            return rows[0]
        })
}

const deleteUser = async (id) => {
    await db("users").where("user_id",id).delete()
}
module.exports = {
  getUser,
  createUser,
  deleteUser,
  findBy
}

const db = require("../../data/db-config.js")

const getAllUsers = () => {
    return db("users")
}

const getUser = (user_id) => {
    console.log(user_id)
    const user = db("users").where({user_id}).first()
    console.log("from the getUser", user)
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
}   ///    done    ///

const deleteUser = async (id) => {
    await db("users").where("user_id",id).delete()
}
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  findBy
}

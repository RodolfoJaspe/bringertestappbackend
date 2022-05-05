
const users = [
                {user_id: 1, username: "sofiajaspe", password: "abc123"},
                {user_id: 2, username: "dayanamorales", password: "abc456"},
                {user_id: 3, username: "rodolfojaspe", password: "abc789"}
            ]


 exports.seed = async function(knex) {
    await knex("users").insert(users)
  };
  
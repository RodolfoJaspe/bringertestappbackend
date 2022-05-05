
const users = [
                {user_id: 1, user_name: "sofiajaspe", password: "abc123"},
                {user_id: 2, user_name: "dayanamorales", password: "abc456"},
                {user_id: 3, user_name: "rodolfojaspe", password: "abc789"}
            ]


 exports.seed = async function(knex) {
    await knex("users").insert(users)
  };
  
const db = require("../../data/db-config");

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
function find() {
  
  return db("users")
          .select("user.user_id", "user.username")

}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
async function findBy(filter) {

  const filteredUser = await db("users")
                        .where({filter})

  return filteredUser[0]
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {

  return db("users")
  .where("users.user_id", user_id)

}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {

  const newUserId = await db("users")
                  .insert(user)

  return findById(newUserId)
}

module.exports = { find, findBy, findById, add }
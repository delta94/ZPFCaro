const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
let repoMongo = {}
let collectionUsers 
let collectionGames

// Connect to MongoDB & get database with name "ZPFCaro"
repoMongo.connectMongoDB = () => {
    mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        let myDB = client.db('ZPFCaro')
        collectionUsers = myDB.collection('Users')
        collectionGames = myDB.collection('Games')
        console.log("MongoDB connected")
    })
    .catch((err) => {
        console.log(err)
    })
}

// Get all users
repoMongo.getAllUsers = async () => {
    let val = await collectionUsers.find().toArray()
    return (val != null) ? val : null
}

// Get user by username
repoMongo.getUserByUsername = async (username) => {
    let val = await collectionUsers.findOne({username: username})
    return (val != null) ? val : null
}

// Get user by email
repoMongo.getUserByEmail = async (email) => {
    let val = await collectionUsers.findOne({email: email}) 
    return (val != null) ? val : null
}

// Add user 
// Function receives JSON "newUser" parameters with string structure:
// '{"username" : "xxxxx", "password" : "xxxxx", "email" : "xxxxx", "display_name" : "xxxxx"}'
repoMongo.addUser = (newUser) => {
    collectionUsers.insertOne({username: newUser.username, password: newUser.password, email: newUser.email, display_name: newUser.display_name, points: 0, avatar: "", win_num: 0, draw_num: 0, lose_num: 0}, (err, result) => {
        if (err) {
            console.log(err)
            return null
        }
        return result
    })
}

// Update display_name of user by username
repoMongo.updateNameOfUser = (username, newName) => {
    collectionUsers.updateOne({username: username}, {$set: {display_name: newName}}, (err, val) => {
        if (err) {
            console.log(err)
            return false
        }
        return true
    })
}

// Update email of user by username
repoMongo.updateEmailOfUser = (username, newemail) => {
    collectionUsers.updateOne({username: username}, {$set: {email: newemail}}, (err, val) => {
        if (err) {
            console.log(err)
            return false
        }
        return true
    })
}

// Update password of user by username
repoMongo.updatePasswordOfUser = (username, newpassword) => {
    collectionUsers.updateOne({username: username}, {$set: {password: newpassword}}, (err, val) => {
        if (err) {
            console.log(err)
            return false
        }
        return true
    })
}

// Update avatar link of user by username
repoMongo.updateAvatarOfUser = (username, avatarlink) => {
    collectionUsers.updateOne({username: username}, {$set: {avatar: avatarlink}}, (err, val) => {
        if (err) {
            console.log(err)
            return false
        }
        return true
    })
}

// Update points of user by username
repoMongo.updatePointsOfUser = (username, points) => {
    collectionUsers.updateOne({username: username}, {$set: {points: points}}, (err, val) => {
        if (err) {
            console.log(err)
            return false
        }
        return true
    })
}

// Update win_num of user by username
repoMongo.updateWinNumOfUser = (username, win_num) => {
    collectionUsers.updateOne({username: username}, {$set: {win_num: win_num}}, (err, val) => {
        if (err) {
            console.log(err)
            return false
        }
        return true
    })
}

// Update draw_num of user by username
repoMongo.updateDrawNumOfUser = (username, draw_num) => {
    collectionUsers.updateOne({username: username}, {$set: {draw_num: draw_num}}, (err, val) => {
        if (err) {
            console.log(err)
            return false
        }
        return true
    })
}

// Update lose_num of user by username
repoMongo.updateLoseNumOfUser = (username, lose_num) => {
    collectionUsers.updateOne({username: username}, {$set: {lose_num: lose_num}}, (err, val) => {
        if (err) {
            console.log(err)
            return false
        }
        return true
    })
}

// Update user info (update all user info excepts username)
// Parameter: A JSON variable contains all user info | Structure of JSON:
// '{"password" : "xxxxx", "email" : "xxxxx", "display_name" : "xxxxx", "avatar" : "xxxxx", "points" : xxxxx, "win_num" : xxxxx, "draw_num" : xxxxx, "lose_num" : xxxxx}'
repoMongo.updateUserInfo = (username, userInfo) => {
    collectionUsers.updateOne({username: username}, {$set: {password: userInfo.password, email: userInfo.email, display_name: userInfo.display_name, avatar: userInfo.avatar, points: userInfo.points, win_num: userInfo.win_num, draw_num: userInfo.draw_num, lose_num: userInfo.lose_num}}, (err, val) => {
        if (err) {
            console.log(err)
            return false
        }
        return true
    })
}

// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

// Add game
// Function receives JSON "newGame" parameters with string structure:
// '{"id" : "xxxxx", "user_id" : "xxxxx", "guest_id" : "xxxxx", "bet_points" : xxxxx, "status" : xxxxx}'
// status has one of three values : -1 (host lost), 0 (both persion drew), 1 (host won)
repoMongo.addGame = (newGame) => {
    collectionGames.insertOne({_id: newGame.id, user_id: newGame.user_id, guest_id: newGame.guest_id, bet_points: newGame.bet_points, status: newGame.status}, (err, val) => {
        if (err) {
            console.log(err)
            return null
        }
        return val
    })
}

// Get info game by gameID
repoMongo.getGameByID = async (gameID) => {
    let val = await collectionGames.findOne({_id: gameID}) 
    return (val != null) ? val : null
}

module.exports = repoMongo;
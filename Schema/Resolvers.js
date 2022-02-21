const connectedPlayers = {1 : {id: 1, positionX: 0, positionY: 0, positionZ: 0},
                           2 : {id: 2, positionX: 0, positionY: 0, positionZ: 0}
                          }
const lobbies = {1 : {numOfPlayers: 4, lobbyPlayers: [connectedPlayers[1], connectedPlayers[2]]}}

// https://devcenter.heroku.com/articles/deploying-nodejs ==> deployment

//const connectedPlayers = {}
//const lobbies = {}

const resolvers = {
    Query: {
        getLobbyPlayers(parent, args) {
            const lobbyId = args.lobbyId
            return lobbies[lobbyId].lobbyPlayers
        }
    },
    Mutation: {
        createGameCode(parent, args) {
            const userId = args.userId
            let curUser = {}
            curUser[userId] = connectedPlayers[userId]
            if (Object.keys(lobbies).length === 0) {
                lobbies[1] = {numOfPlayers: 4, lobbyPlayers: curUser}
                return 1
            }

            //else
            let newLobbyId = Object.keys(lobbies).length+1
            lobbies[newLobbyId] = {numOfPlayers: 4, lobbyPlayers : {userId: curUser}}
            return newLobbyId
        },
        createUserId(parent, args) {
            if (Object.keys(connectedPlayers).length === 0) {
                connectedPlayers[1] = {positionX: 0, positionY: 0, positionZ: 0}
                return 1
            }

            //else
            let newPlayerId = Object.keys(connectedPlayers).length+1
            connectedPlayers[newPlayerId] = {positionX: 0, positionY: 0, positionZ: 0}
            return newPlayerId
        },
        joinGame(parent, args) {
            const gameCode = args.gameId
            const userId = args.userId

            if (!Object.keys(lobbies).includes(gameCode)) {
                return 0
            }

            //else
            lobbies.gameCode.lobbyPlayers[userId] = connectedPlayers[userId]

            return 1
        },
        syncPlayerPosition(parents, args) {
            const playerId = args.id
            const lobbyId = args.lobbyId
            const x = args.x
            const y = args.y
            const z = args.z

            lobbies[lobbyId].lobbyPlayers[playerId].positionX = x
            lobbies[lobbyId].lobbyPlayers[playerId].positionY = y
            lobbies[lobbyId].lobbyPlayers[playerId].positionZ = z

            return 1
        }
    }
}

module.exports = { resolvers }
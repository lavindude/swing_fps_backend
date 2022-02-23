const connectedPlayers = [{id: 1, positionX: 0, positionY: 0, positionZ: 0},
                           {id: 2, positionX: 0, positionY: 0, positionZ: 0}
                         ]
const lobbies = {1 : {numOfPlayers: 4, lobbyPlayers: [connectedPlayers[0], connectedPlayers[1]]}}

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
            const curUser = connectedPlayers[userId-1]
            if (Object.keys(lobbies).length === 0) {
                lobbies[1] = {numOfPlayers: 4, lobbyPlayers: [curUser]}
                return 1
            }

            //else
            let newLobbyId = Object.keys(lobbies).length+1
            lobbies[newLobbyId] = {numOfPlayers: 4, lobbyPlayers: [curUser]}
            return newLobbyId
        },
        createUserId(parent, args) {
            if (connectedPlayers.length === 0) {
                connectedPlayers[0] = {id: 1, positionX: 0, positionY: 0, positionZ: 0}
                return 1
            }

            //else
            const newPlayerId = connectedPlayers.length+1
            connectedPlayers.push({id: newPlayerId, positionX: 0, positionY: 0, positionZ: 0})
            return newPlayerId
        },
        joinGame(parent, args) {
            const gameCode = args.gameId
            const userId = args.userId

            if (!Object.keys(lobbies).includes(gameCode)) {
                return 0
            }

            //else
            lobbies.gameCode.lobbyPlayers.push(connectedPlayers[userId])
            return 1
        },

        /*
            Note that the syncPlayerPostition mutation is buggy because the players in 
            lobbyPlayers may not be in order and it may not be the first 4 connected players
            in the game server.
        */
        syncPlayerPosition(parents, args) {
            const playerId = args.id
            const lobbyId = args.lobbyId
            const x = args.x
            const y = args.y
            const z = args.z

            lobbies[lobbyId].lobbyPlayers[playerId-1].positionX = x
            lobbies[lobbyId].lobbyPlayers[playerId-1].positionY = y
            lobbies[lobbyId].lobbyPlayers[playerId-1].positionZ = z

            return 1
        }
    }
}

module.exports = { resolvers }
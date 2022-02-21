const connectedPlayers = {1 : {id: 1, positionX: 0, positionY: 0, positionZ: 0},
                          2 : {id: 2, positionX: 0, positionY: 0, positionZ: 0}
                         }
//const lobbies = {"gameCode1" : {numOfPlayers: 4, lobbyPlayers: {"sample": connectedPlayers["sample"]}, 
//                                                              "sample2": connectedPlayers["sample2"]}}

const lobbies = {}

const resolvers = {
    Query: {
        verifyGameCode() {
            return 1 // we may not need this function
        }
    },
    Mutation: {
        createGameCode(parent, args) {
            const userId = args.userId
            if (Object.keys(lobbies).length === 0) {
                lobbies[1] = {numOfPlayers: 4, lobbyPlayers: {userId: connectedPlayers[userId]}}
                return 1
            }

            //else
            let newLobbyId = Object.keys(lobbies).length + 1
            lobbies[newLobbyId] = {numOfPlayers: 4, lobbyPlayers : {userId: connectedPlayers[userId]}}
            return newLobbyId
        },
        createUserId(parent, args) {
            return 2
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
            return 1
        }
    }
}

module.exports = { resolvers }
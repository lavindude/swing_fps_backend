// Sample Data:
// const connectedPlayers = [{id: 1, positionX: 0, positionY: 0, positionZ: 0},
//                            {id: 2, positionX: 0, positionY: 0, positionZ: 0}
//                          ]
// const lobbies = [{id: 1, numOfPlayers: 4, lobbyPlayers: [connectedPlayers[0], connectedPlayers[1]]}]

// maybe write some automated tests at some point
// refactor the code to make it more modular, maybe have a logic.js file
// maybe it's best to store data in a different file

const connectedPlayers = []
const lobbies = []

const getIndex = (playerId, lobbyId) => {
    const curLobbyArray = lobbies[lobbyId-1].lobbyPlayers
    for (var i=0; i < curLobbyArray.length; i++) {
        if (curLobbyArray[i].id == playerId) {
            return i
        }
    }
}

const resolvers = {
    Query: {
        getLobbyPlayers(parent, args) {
            const lobbyId = args.lobbyId
            return lobbies[lobbyId-1].lobbyPlayers
        },
        getConnectedPlayers(parent, args) {
            return connectedPlayers
        },
        getLobbies(parent, args) {
            return lobbies
        }
    },
    Mutation: {
        createGameCode(parent, args) {
            const userId = args.userId
            const curUser = connectedPlayers[userId-1]
            if (lobbies.length === 0) {
                lobbies[0] = {id: 1, numOfPlayers: 4, lobbyPlayers: [curUser]}
                return 1
            }

            //else
            const newLobbyId = lobbies.length+1
            lobbies[newLobbyId-1] = {id: newLobbyId, numOfPlayers: 4, lobbyPlayers: [curUser]}
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

            const lobbyIdList = lobbies.map(item => item.id)
            if (!lobbyIdList.includes(gameCode)) {
                return 0
            }

            //else
            lobbies[gameCode-1].lobbyPlayers.push(connectedPlayers[userId-1])
            return 1
        },
        syncPlayerPosition(parents, args) {
            const playerId = args.id
            const lobbyId = args.lobbyId
            const x = args.x
            const y = args.y
            const z = args.z

            const curPlayerLobbyIndex = getIndex(playerId, lobbyId)

            lobbies[lobbyId-1].lobbyPlayers[curPlayerLobbyIndex].positionX = x
            lobbies[lobbyId-1].lobbyPlayers[curPlayerLobbyIndex].positionY = y
            lobbies[lobbyId-1].lobbyPlayers[curPlayerLobbyIndex].positionZ = z

            return 1
        }
    }
}

module.exports = { resolvers }
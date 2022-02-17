const connectedPlayers = {"sample" : {id: 1, positionX: 0, positionY: 0, positionZ: 0},
                          "sample2" : {id: 2, positionX: 0, positionY: 0, positionZ: 0}
                         }
const lobbies = {"gameCode1" : {numOfPlayers: 4, lobbyPlayers: {"sample": connectedPlayers["sample"]}, 
                                                              "sample2": connectedPlayers["sample2"]}}

const resolvers = {
    Query: {
        verifyGameCode() {
            return 1
        }
    },
    Mutation: {
        createGameCode(parent, args) {
            return 111
        },
        createUserId(parent, args) {
            return 2
        },
        joinGame(parent, args) {
            return 1
        },
        syncPlayerPosition(parents, args) {
            return 1
        }
    }
}

module.exports = { resolvers }
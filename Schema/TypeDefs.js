const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Player {
        id: Int!
        positionX: Float!
        positionY: Float!
        positionZ: Float!
    }

    # Queries
    type Query {
        getLobbyPlayers(lobbyId: Int!): [Player]!
    }

    # Mutations
    type Mutation {
        createGameCode(userId: Int!): Int!
        createUserId: Int!
        joinGame(gameId: Int!, userId: Int!): Int!
        syncPlayerPosition(id: Int!, lobbyId: Int!, x: Float!, y: Float!, z: Float!): Int!
    }
`

module.exports = { typeDefs }
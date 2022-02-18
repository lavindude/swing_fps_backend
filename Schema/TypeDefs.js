const { gql } = require('apollo-server-express')

const typeDefs = gql`

    # Queries
    type Query {
        verifyGameCode(code: Int!): Int!
    }

    # Mutations
    type Mutation {
        createGameCode(userId: Int!): Int!
        createUserId: Int!
        joinGame(gameId: Int!, userId: Int!): Int!
        syncPlayerPosition(id: Int!, x: Float!, y: Float!, z: Float!): Int!
    }
`

module.exports = { typeDefs }
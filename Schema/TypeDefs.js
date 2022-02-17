const { gql } = require('apollo-server-express')

const typeDefs = gql`

    # Queries
    type Query {
        verifyGameCode(code: Int!): Int!
    }

    # Mutations
    type Mutation {
        createGameCode: Int!
        createUserId: Int!
        joinGame(id: Int!): Int!
        syncPlayerPosition(id: Int!, x: Float!, y: Float!, z: Float!): Int!
    }
`

module.exports = { typeDefs }
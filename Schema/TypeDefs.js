const { gql } = require('apollo-server-express')

const typeDefs = gql`

    #Queries
    type Query {
        generateCode: Int!
    }

    #Mutations
`

module.exports = { typeDefs }
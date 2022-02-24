const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const { typeDefs } = require('./Schema/TypeDefs')
const { resolvers } = require('./Schema/Resolvers')

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })
const port = process.env.PORT || 4000

server.applyMiddleware({ app })
app.listen({port: port}, () => {
    console.log("Listening on port " + port)
})

/*
    Example queries:

    query {
        generateCode
    }

    mutation {
        joinGame(id: 1)
    }
*/
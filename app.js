const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const { typeDefs } = require('./Schema/TypeDefs')
const { resolvers } = require('./Schema/Resolvers')

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })
app.listen({port: 4000}, () => {
    console.log("Listening")
})
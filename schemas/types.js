const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

const dataType = new GraphQLObjectType({
    name: "Data",
    type: "Query",
    fields: {
        
    }
})
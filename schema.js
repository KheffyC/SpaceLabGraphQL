const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')


// Hardcoded Data
const customers = [
    {id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 35},
    {id: '2', name: 'Jeffrey Small', email: 'jeffery@gmail.com', age: 40},
    {id: '3', name: 'Billy Bob', email: 'Bobby@gmail.com', age: 17},
]


// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type:CustomerType,
            args:{
                id:{type: GraphQLString}
            },
            resolve(parentValue, args){
                for(let i=0; i<customers.length; i++){
                    if(customers[i].id == args.id){
                        return customers[i]
                    }
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
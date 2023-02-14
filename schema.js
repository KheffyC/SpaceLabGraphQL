const { db } = require('./pgAdaptor')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')


// Customer Type
const DataType = new GraphQLObjectType({
    name: 'Data',
    fields: () => ({
        toi: {type: GraphQLFloat},
        toipfx: {type: GraphQLInt},
        tid: {type: GraphQLInt},
        ctoi_alias: {type: GraphQLFloat},
        pl_pnum: {type: GraphQLInt},
        tfopwg_disp: {type: GraphQLString},
        rastr: {type: GraphQLString},
        ra: {type: GraphQLFloat},
        raerr1: {type: GraphQLString},
        raerr2: {type: GraphQLString},
        decstr: {type: GraphQLString},
        dec: {type: GraphQLFloat},
        decerr1: {type: GraphQLString},
        decerr2: {type: GraphQLString},
        st_pmra: {type: GraphQLFloat},
        st_pmraerr1: {type: GraphQLFloat},
        st_pmraerr2: {type: GraphQLFloat},
        st_pmralim: {type: GraphQLInt},
        st_pmrasymerr: {type: GraphQLInt},
        st_pmdec: {type: GraphQLFloat},
        st_pmdecerrr1: {type: GraphQLFloat},
        st_pmdecerr2: {type: GraphQLFloat},
        st_pmdeclim: {type: GraphQLInt},
        st_pmdecsymerr: {type: GraphQLInt},
        pl_tranmid: {type: GraphQLFloat},
        pl_tranmiderr1: {type: GraphQLFloat},
        pl_tranmiderr2: {type: GraphQLFloat},
        pl_tranmidlim: {type: GraphQLInt},
        pl_tranmidsymerr: {type: GraphQLInt},
        pl_orbper: {type: GraphQLFloat},
        pl_orbpererr1: {type: GraphQLFloat},
        pl_orbpererr2: {type: GraphQLFloat},
        pl_orbperlim: {type: GraphQLInt},
        pl_orbpersymerr: {type: GraphQLInt},
        pl_trandurh: {type: GraphQLFloat},
        pl_trandurherr1: {type: GraphQLFloat},
        pl_trandurherr2: {type: GraphQLFloat},
        pl_trandurhlim: {type: GraphQLInt},
        pl_trandurhsymerr: {type: GraphQLInt},
        pl_trandep: {type: GraphQLFloat},
        pl_trandeperr1: {type: GraphQLFloat},
        pl_trandeperr2: {type: GraphQLFloat},
        pl_trandeplim: {type: GraphQLInt},
        pl_trandepsymerr: {type: GraphQLInt},
        pl_rade: {type: GraphQLFloat},
        pl_radeerr1: {type: GraphQLFloat},
        pl_radeerr2: {type: GraphQLFloat},
        pl_radelim: {type: GraphQLInt},
        pl_radesymerr: {type: GraphQLInt},
        pl_insol: {type: GraphQLFloat},
        pl_insolerr1: {type: GraphQLString},
        pl_insolerr2: {type: GraphQLString},
        pl_insollim: {type: GraphQLString},
        pl_insolsymerr: {type: GraphQLString},
        pl_eqt: {type: GraphQLFloat},
        pl_eqterr1: {type: GraphQLString},
        pl_eqterr2: {type: GraphQLString},
        pl_eqtlim: {type: GraphQLString},
        pl_eqtsymerr: {type: GraphQLString},
        st_tmag: {type: GraphQLFloat},
        st_tmagerr1: {type: GraphQLFloat},
        st_tmagerr2: {type: GraphQLFloat},
        st_tmaglim: {type: GraphQLInt},
        st_tmagsymerr: {type: GraphQLInt},
        st_dist: {type: GraphQLFloat},
        st_disterr1: {type: GraphQLFloat},
        st_disterr2: {type: GraphQLFloat},
        st_distlim: {type: GraphQLInt},
        st_distsymerr: {type: GraphQLInt},
        st_teff: {type: GraphQLFloat},
        st_tefferr1: {type: GraphQLFloat},
        st_tefferr2: {type: GraphQLFloat},
        st_tefflim: {type: GraphQLInt},
        st_teffsymerr: {type: GraphQLInt},
        st_logg: {type: GraphQLFloat},
        st_loggerr1: {type: GraphQLFloat},
        st_loggerr2: {type: GraphQLFloat},
        st_logglim: {type: GraphQLInt},
        st_loggsymerr: {type: GraphQLInt},
        st_rad: {type: GraphQLFloat},
        st_raderr1: {type: GraphQLFloat},
        st_raderr2: {type: GraphQLFloat},
        st_radlim: {type: GraphQLInt},
        st_radsymerr: {type: GraphQLInt}
        // toi_created: {type: GraphQL},
        // rowupdate: {type: GraphQLFloat},
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        SingleData: {
            type:DataType,
            args:{
                toi:{type: GraphQLFloat}
            },
            resolve(parentValue, args){
                const query = `SELECT * FROM "SPACELAB" WHERE toi=${args.toi}`

                return db
                    .one(query)
                    .then(res => res)
                    .catch(err => err)
            }
        },
        Data:{
            type: new GraphQLList(DataType),
            resolve(parentValue){
                const query = `SELECT * FROM "SPACELAB"`

                return db
                    .many(query).then(res => res).catch(err => console.log(err))
            }
        }
    }
})

// const mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addCustomer: {
//             type:CustomerType,
//             args:{
//                 name: {type: new GraphQLNonNull(GraphQLString)},
//                 email: {type: new GraphQLNonNull(GraphQLString)},
//                 age: {type: new GraphQLNonNull(GraphQLInt)},
//             },
//             resolve(parentValue, args){
//                 return axios.post('http://localhost:3000/customers', {
//                     name: args.name,
//                     email: args.email,
//                     age: args.age,
//                 }).then(res => res.data)
//             }
//         },
//         deleteCustomer: {
//             type:CustomerType,
//             args:{
//                 id: {type: new GraphQLNonNull(GraphQLString)}
//             },
//             resolve(parentValue, args){
//                 return axios.delete(`http://localhost:3000/customers/${args.id}`)
//                     .then(res => res.data)
//             }
//         },
//         editCustomer: {
//             type:CustomerType,
//             args:{
//                 id: {type: new GraphQLNonNull(GraphQLString)},
//                 name: {type: GraphQLString},
//                 email: {type: GraphQLString},
//                 age: {type: GraphQLInt},
//             },
//             resolve(parentValue, args){
//                 return axios.patch(`http://localhost:3000/customers/${args.id}`, args)
//                     .then(res => res.data)
//             }
//         },
//     }
// })

module.exports = new GraphQLSchema({
    query: RootQuery,
})
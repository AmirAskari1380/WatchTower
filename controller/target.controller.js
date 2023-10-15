const target = require('../models/target.model')

async function getAllTargets() {
    return await target.find({})
}

async function createTarget(name, scope, out_of_scopes, eligible_for_bounty, source, type) {
    const new_target = new target({
        name,
        scope,
        out_of_scopes,
        eligible_for_bounty,
        source,
        type
    })
        .save()
        .then(() => {
            console.log("New target has been added!")
        })
        .catch(async (error) => {
            if (error.name == 'MongoServerError' && error.code == 11000) {
                await target.updateOne(
                    {
                        name
                    },
                    {
                        scope,
                        out_of_scopes,
                        eligible_for_bounty,
                        source,
                        type
                    }
                )
            }
        })

    return {
        name,
        scope,
        out_of_scopes,
        eligible_for_bounty,
        source,
        type
    }
}

module.exports = {
    getAllTargets,
    createTarget
}
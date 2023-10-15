const { exec } = require('child_process')
const target = require('../models/target.model')
const subdomain = require('../models/subdomain.model')
const DiscordHook = require('../utils/discord')
const { MessageBuilder } = require('discord-webhook-node');

async function enumeration() {
    const targets = await target.find({})

    targets.forEach((t) => {
        console.log("Going to run subfinder on all targets ...")
        let scopes = t.scope
        let out_of_scopes = t.out_of_scopes

        if (out_of_scopes != []) {
            out_of_scopes = `| grep -Ev "(${out_of_scopes.join("|")})"`
        } else {
            out_of_scopes = ''
        }

        scopes.forEach((scope) => {
            console.log(`subfinder -d ${scope} -all ${out_of_scopes}`)
            exec(`subfinder -d ${scope} -all ${out_of_scopes}`, async (error, stdout, stderr) => {
                if (error) {
                    console.log("Some error when trying to run command");
                    return;
                }

                let subdomains = stdout.split('\n')
                let old_subdomains = await subdomain.find({
                    target: t._id
                }).select('subdomain').distinct('subdomain');

                let new_subdomains = subdomains.filter(subdomain => !old_subdomains.includes(subdomain));

                let operations = []
                new_subdomains.forEach(async (subdomain) => {
                    operations.push({
                        target: t._id,
                        subdomain: subdomain
                    })
                })

                await subdomain.insertMany(operations)

                if (new_subdomains.length > 0) {
                    const message = new MessageBuilder()
                        .setTitle('New Subdomains')
                        .setDescription(`We found ${new_subdomains.length} new subdomains on ${t.name}:\n\`\`\`${new_subdomains.join("\n")}\`\`\``)
                        .setTimestamp();

                    await DiscordHook.send(message)
                }
            })
        })
    })
}

module.exports = enumeration
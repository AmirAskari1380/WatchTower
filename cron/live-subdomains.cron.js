const { exec } = require('child_process')
const livesubdomain = require('../models/live-subdomain.model')
const subdomain = require('../models/subdomain.model')
const DiscordHook = require('../utils/discord')
const { MessageBuilder } = require('discord-webhook-node');
const target = require('../models/target.model')

async function resolve() {
    console.log("Going to run dnsx on all targets ...")
    const targets = await target.find({})

    targets.forEach(async (t) => {
        const subdomains = await subdomain.find({ target: t._id }).select('subdomain').distinct('subdomain')
        // console.log(`echo ${subdomains.join("\n")} | jq -r '.[]' | puredns -q`)
        exec(`echo "${subdomains.join("\n")}" | dnsx -silent`, async (error, stdout, stderr) => {
            if (error) {
                console.log(`When trying to run puredns, we got some error: ${error}`)
                return;
            }

            let resolved_subdomains = stdout.split("\n")
            let old_subdomains = await livesubdomain.find({ target: t._id }).select('subdomain').distinct('subdomain');

            let new_subdomains = resolved_subdomains.filter(subdomain => !old_subdomains.includes(subdomain));

            let operations = []
            new_subdomains.forEach(async (subdomain) => {
                operations.push({
                    target: t._id,
                    subdomain: subdomain
                })
            })

            await livesubdomain.insertMany(operations)

            if (new_subdomains.length > 0) {
                const message = new MessageBuilder()
                    .setTitle('New Live Subdomains')
                    .setDescription(`We found ${new_subdomains.length} new live subdomains on ${t.name}:\n\`\`\`${new_subdomains.join("\n")}\`\`\``)
                    .setTimestamp();

                await DiscordHook.send(message)
            }
        })
    })
}

module.exports = resolve
const { exec } = require('child_process')
const livesubdomain = require('../models/live-subdomain.model')
const httpservice = require('../models/http-services.model')
const DiscordHook = require('../utils/discord')
const { MessageBuilder } = require('discord-webhook-node');
const target = require('../models/target.model')

async function httpx() {
    console.log("Going to run httpx on all targets ...")
    const targets = await target.find({})

    targets.forEach(async (t) => {
        const subdomains = await livesubdomain.find({ target: t._id }).select('subdomain').distinct('subdomain')
        exec(`echo "${subdomains.join("\n")}" | httpx -silent -exclude-cdn`, async (error, stdout, stderr) => {
            if (error) {
                console.log(`When trying to run puredns, we got some error: ${error}`)
                return;
            }

            let http_services = stdout.split("\n")
            let old_subdomains = await httpservice.find({ target: t._id }).select('subdomain').distinct('subdomain');

            let new_subdomains = http_services.filter(subdomain => !old_subdomains.includes(subdomain));

            let operations = []
            new_subdomains.forEach(async (subdomain) => {
                operations.push({
                    target: t._id,
                    subdomain: subdomain
                })
            })

            await httpservice.insertMany(operations)

            console.log(new_subdomains)
            console.log(new_subdomains.length)

            if (new_subdomains.length > 0) {
                const message = new MessageBuilder()
                    .setTitle('New HTTP Subdomains')
                    .setDescription(`We found ${new_subdomains.length} new live subdomains on ${t.name}:\n\`\`\`${new_subdomains.join("\n")}\`\`\``)
                    .setTimestamp();

                await DiscordHook.send(message)
            }
        })
    })
}

module.exports = httpx
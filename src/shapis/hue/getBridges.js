const { Bridge } = require('hue')

/**
 * @description Discovers all Hue Bridges
 * @returns {Promise<Bridge[]>} Array of Hue Bridges
 */
async function getBridges (username) {
    const bridges = await Bridge.all()

    const bridgeArray = []
    for (const bridge of bridges) {
        try {
            await bridge.authenticate(username)
            bridgeArray.push(bridge)
        } catch (err) {
            throw err
        }
    }

    return bridgeArray
}

module.exports = getBridges
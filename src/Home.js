const getHueBridges = require('./shapis/hue/getBridges.js')

class Home {
    /**
     * @description Create a new Home object
     * @returns {Home}
     */
    constructor () {
        this.bridges = {
            hue: []
        }

        this.activatedProviders = {
            hue: false
        }

        this.providerAuthentifications = {
            hue: ''
        }
    }

    addProvider (provider, options) {
        if (provider === 'hue') {
            this.activatedProviders.hue = true
            this.providerAuthentifications.hue = options.authentification
        } else {
            throw new Error('Provider not supported: ' + provider)
        }
    }

    /**
     * @description Discovers all bridges
     * @returns {Promise<void>}
     * @private This shouldn't be called directly as it's automatically called by discover()
     */
    async discoverBridges () {
        if (this.activatedProviders.hue) this.bridges.hue = await getHueBridges(this.providerAuthentifications.hue)
    }

    /**
     * @description Discovers all devices on all bridges
     * @returns {Promise<DeviceList>}
     */
    async discover () {
        await this.discoverBridges()
        
        const bridge = this.bridges.hue[0]
        try {
            const lights = await bridge.Light.all()
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = Home
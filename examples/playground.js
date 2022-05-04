const { Home } = require('../shl')

const home = new Home()

// Set up providers
home.addProvider('hue', {
    authentification: require('./_auth.json').hue
})

// Discover devices
home.discover().then(deviceList => {
    console.log(deviceList)
})
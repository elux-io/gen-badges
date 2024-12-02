const core = require('@actions/core')
const github = require('@actions/github')
const { getBadge, getCoverageBadge } = require('./badges.js')
const opentype = require('opentype.js')
const fs = require('fs')

;(async () => {
    try {
        const theme = core.getInput('theme')
        const status = core.getInput('status')
        const os = core.getInput('os')
        const coverage = core.getInput('coverage')

        const dark = theme === 'dark'
        let svg

        if (status !== '') {
            svg = getBadge(os, status, dark)
        } else {
            const buffer = (await fs.promises.readFile('./fonts/Outfit-Medium.ttf')).buffer
            const font = opentype.parse(buffer)
            svg = getCoverageBadge(font, coverage, dark)
            svg = svg.replace(/[\n\r]/g, '')
        }

        core.setOutput('svg', svg)
    } catch (error) {
        core.setFailed(error.message)
    }
})()

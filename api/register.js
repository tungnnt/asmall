const axios = require('axios')
const RandExp = require('randexp')
const https = require('https')
const agent = new https.Agent({
    rejectUnauthorized: false
})

const _randomString = (length) => {
    let result = ''
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

const _randomCookie = () => {
    return `s3ba1a453=${_randomString(5)}k8l9hn${_randomString(10)}u8l26`
}

const _randomPhone = () => {
    return new RandExp(/^09[0-9]{8}$/).gen();
}

module.exports = async (username, email, verify) => {
    if (!username || !email || !verify) throw new Error('Missing argument.')

    const tel = _randomPhone()
    const data = encodeURI(`user_name=${username}&code1=84&tel=${tel}&email=${email}&verify=${verify}&pwd=123456789&deposit_pwd=123456789&invite_code=YP4Q7T`)

    const config = {
        method: 'post',
        url: 'https://www.asmall.net/index/user/do_register.html',
        headers: {
            'authority': 'www.asmall.net',
            'accept': '*/*',
            'x-requested-with': 'XMLHttpRequest',
            'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Mobile Safari/537.36',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'origin': 'https://www.asmall.net',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://www.asmall.net/index/user/register.html?invite_code=YP4Q7T&lang=en-us',
            'accept-language': 'en-US,en;q=0.9',
            'cookie': _randomCookie()
        },
        data: data,
        httpsAgent: agent
    }

    const response = await axios(config)
    return response.data
}
const axios = require("axios")

const mailDomains = ['inscriptio.in', 'cloud-mail.top', 'montokop.pw', 'privacy-mail.top', 'safemail.icu', 'myinbox.icu', 'just4fun.me']

const _generateRandomInteger = (max) => {
    return Math.floor(Math.random() * max);
}

const _slugifyName = (str) => {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    str = str.replace(/đ/g, "d")
    str = str.replace(/ /g, "")
    str = str.replace(/\./g, "")
    return str.trim()
}

const _randomMailAddress = (username) => {
    const subfix = username
    const domain = mailDomains[_generateRandomInteger(mailDomains.length)]
    return `${subfix}@${domain}`
}

const recoverMail = (mail) => {
    let headers = {
        'authority': 'api.internal.temp-mail.io',
        'accept': 'application/json, text/plain, */*',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
        'content-type': 'application/json;charset=UTF-8',
        'origin': 'https://temp-mail.io',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://temp-mail.io/en',
        'accept-language': 'en-US,en;q=0.9,vi;q=0.8'
    };

    let data = {
        "name": mail.split('@')[0],
        "domain": mail.split('@')[1],
    };

    let api = 'https://api.internal.temp-mail.io/api/v3/email/new';

    return new Promise((resolve, reject) => {
        axios.post(api, data, { headers: headers })
            .then(response => resolve(response.data))
            .catch(error => {
                return reject(error)
            });
    })
}

const getRandomMail = (username) => {
    let newMail = _randomMailAddress(username)

    let headers = {
        'authority': 'api.internal.temp-mail.io',
        'accept': 'application/json, text/plain, */*',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
        'content-type': 'application/json;charset=UTF-8',
        'origin': 'https://temp-mail.io',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://temp-mail.io/en',
        'accept-language': 'en-US,en;q=0.9,vi;q=0.8'
    };

    let data = {
        "name": newMail.split('@')[0],
        "domain": newMail.split('@')[1],
    };

    let api = 'https://api.internal.temp-mail.io/api/v3/email/new';

    return new Promise((resolve, reject) => {
        axios.post(api, data, { headers: headers })
            .then(response => resolve(response.data))
            .catch(error => {
                return reject(error)
            });
    })
}

const getMessage = (mail) => {
    let headers = {
        'authority': 'api.internal.temp-mail.io',
        'accept': 'application/json, text/plain, */*',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
        'origin': 'https://temp-mail.io',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://temp-mail.io/en',
        'accept-language': 'en-US,en;q=0.9,vi;q=0.8'
    };

    let api = `https://api.internal.temp-mail.io/api/v3/email/${mail}/messages`

    return new Promise((resolve, reject) => {
        axios.get(api, { headers: headers })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                return reject(error)
            });
    })
}

const parseOTP = (message) => {
    let otp = message.trim().match(/[0-9]{5}/g);
    return otp[0];
}

module.exports = {
    getRandomMail,
    getMessage,
    parseOTP,
    recoverMail,
}

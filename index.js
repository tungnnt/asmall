const sendMail = require('./api/sendMail')
const {
    getRandomMail,
    getMessage,
    parseOTP,
} = require('./service/tempMail')
const _randomProfile = require('./api/_randomProfile')
const register = require('./api/register')

const signUp = async () => {
    const { userName: username } = _randomProfile()
    console.log({ username })

    const { email } = await getRandomMail(username)
    console.log({ email })

    let response = await sendMail(email, username)
    console.log(response)

    const { code } = response
    let newMail = ''
    let dontHaveMail = true
    let otp = ''
    if (code === 0) {
        while (dontHaveMail) {
            newMail = await getMessage(email)
            console.log({ isCheckingMail: true })
            if (Array.isArray(newMail) && newMail.length > 0) {
                let { body_text } = newMail[newMail.length - 1]
                otp = parseOTP(body_text)
                dontHaveMail = false
            }
            await new Promise((resolve) => { setTimeout(resolve, 1000) })
        }
        console.log({ otp })

        response = await register(username, email, otp)
        console.log(response)
    }
}

setImmediate(async () => {
    while (true){
        try {
            await signUp()
        } catch (error) {
            await signUp()
        }
    }
})
const nodemailer = require("nodemailer");
const { mailAccount } = require("../keys");

const sendOTP = async (otp, receipient) => {
    try {
        console.log(otp)
        let transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
                user: mailAccount.user,
                pass: mailAccount.pass,
            },
        });
        await transporter.sendMail({
            from: 'support@loveblazersmobile.com',
            to: receipient,
            subject: "Lover Blazers Mobile - OTP",
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Love Blazers Mobile</a>
                </div>
                <p style="font-size:1.4em">Hi,</p>
                <p>Use the following OTP to complete your procedures. Ignore if you didn't request for this.</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                <p style="font-size:0.9em;">Regards,<br />Lover Blazers Mobile</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Blaze Of Love Ministries Int'l</p>
                <p></p>
                <p>Benin</p>
                </div>
            </div>
            </div>
            `,
        });
    } catch (err) {
        console.log(err);
    }
}

const approveUser = async (receipient) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
                user: mailAccount.user,
                pass: mailAccount.pass,
            },
        });
        await transporter.sendMail({
            from: 'support@loveblazersmobile.com',
            to: receipient,
            subject: "Lover Blazers Mobile - OTP",
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Love Blazers Mobile</a>
                </div>
                <p style="font-size:1.1em">Congratulations</p>
                <p>Your account has been approved.</p>
                <p style="font-size:0.9em;">Regards,<br />Lover Blazers MObile</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Blaze Of Love Ministries Int'l</p>
                <p></p>
                <p>Benin</p>
                </div>
            </div>
            </div>
            `,
        });
    } catch (err) {
        console.log(err);
    }
}


module.exports = { sendOTP, approveUser }
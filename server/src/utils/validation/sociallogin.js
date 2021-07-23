const https = require('https');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const providers = {
    google: {
        url: 'https://oauth2.googleapis.com/',
        qs: 'tokeninfo?id_token='
    }
};

const validateWithProvider = async (socialToken) => {
    return new Promise((resolve, reject) => {
        const url =
            'https://oauth2.googleapis.com/tokeninfo?id_token=' + socialToken;

        https
            .get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

module.exports = validateWithProvider;

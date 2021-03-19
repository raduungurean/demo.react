const prod = {
    url: {
        AUTH: "https://api.league7.app/api",
        APP: 'https://app.league7.app/api',
    },
    FB_APP_ID: '1110778989394164',
    GOOGLE_CLIENT_ID: '760198945140-270k1vke98qnclpvk38equkrnmmvivc2.apps.googleusercontent.com',
};

const dev = {
    url: {
        AUTH: "https://api.league7.app/api",
        APP: 'https://app.league7.app/api',
    },
    FB_APP_ID: '1110778989394164',
    GOOGLE_CLIENT_ID: '760198945140-270k1vke98qnclpvk38equkrnmmvivc2.apps.googleusercontent.com',
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
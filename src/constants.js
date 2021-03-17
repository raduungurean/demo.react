const prod = {
    url: {
        AUTH: "https://api.league7.app/api",
        APP: 'https://app.league7.app/api',
    },
    FB_APP_ID: '1110778989394164',
};

const dev = {
    url: {
        AUTH: "https://api.league7.app/api",
        APP: 'https://app.league7.app/api',
    },
    FB_APP_ID: '1110778989394164',
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
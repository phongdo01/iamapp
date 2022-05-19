require('dotenv').config();
const {expressjwt} = require('express-jwt');
const SECRET = process.env.SECRET;
module.exports = jwt;

function jwt() {
    return expressjwt({ secret: SECRET, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            { url: /login/, methods: ['GET', 'POST'] },
            '/login',
            // '/api-docs/',
            // '/favicon.ico',
            // '/api-docs/swagger-ui.css',
            // '/api-docs/swagger-ui-init.js',
            // '/api-docs/swagger-ui-bundle.js',
            // '/api-docs/swagger-ui-standalone-preset.js',
        ]
    });
}

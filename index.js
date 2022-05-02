const express = require('express')
const { transferToken } = require('./controller')
const app = express()
app.use(express.json());

require('dotenv').config()

// const port = process.env.PORT

// app.get('/', (req, res) => {
//   res.send('BSC API')
// })

// app.post('/account', (req, res) => createAccount(req, res));
// // BNB related api
// app.post('/balance', (req, res) => getBalance(req, res));
// app.post('/transfer', (req, res) => transfer(req, res));
// // Token related api
// app.post('/token/balance', (req, res) => getTokenBalance(req, res));
// app.post('/token/transfer', (req, res) => transferToken(req, res));

// app.listen(port, () => {
//   console.log(`Server running in port:${port}`)
// })
// console.log(new Date().getTime());
// console.log(new Date().getTime());
// console.log(new Date().getTime());
// console.log(new Date().getTime());
// transferToken("0x3857895Fd4F5d52e40dF4e6e36F164e5A2eA9699", "0x57C11b4820Fb053c8FA13bf4f4E103ee9FBcf42b", 100, 1);
// transferToken("0x3857895Fd4F5d52e40dF4e6e36F164e5A2eA9699", "0x57C11b4820Fb053c8FA13bf4f4E103ee9FBcf42b", 100, 2);
// transferToken("0x3857895Fd4F5d52e40dF4e6e36F164e5A2eA9699", "0x57C11b4820Fb053c8FA13bf4f4E103ee9FBcf42b", 100, 3);
// transferToken("0x3857895Fd4F5d52e40dF4e6e36F164e5A2eA9699", "0x57C11b4820Fb053c8FA13bf4f4E103ee9FBcf42b", 100, 4);

async function transfer() {
    await transferToken("0x57C11b4820Fb053c8FA13bf4f4E103ee9FBcf42b", 100);
    await transferToken("0x57C11b4820Fb053c8FA13bf4f4E103ee9FBcf42b", 100);
    await transferToken("0x57C11b4820Fb053c8FA13bf4f4E103ee9FBcf42b", 100);
}

transfer();
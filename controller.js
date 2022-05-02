const Web3 = require("web3");
const abi = require("./abi.json");

async function createAccount(req, res) {
  // Set web3
  const web3 = new Web3(
    req.body.network && req.body.network === "MAINNET"
      ? process.env.MAINNET
      : process.env.TESTNET
  );

  try {
    let account = await web3.eth.accounts.create();
    res.status(200).send({ status: true, account });
  } catch (error) {
    res.status(500).send({ status: false, message: "Create Account Failed" });
  }
}

async function getBalance(req, res) {
  // Set web3
  const web3 = new Web3(
    req.body.network && req.body.network === "MAINNET"
      ? process.env.MAINNET
      : process.env.TESTNET
  );

  try {
    let balance = await web3.eth.getBalance(req.body.address);
    res
      .status(200)
      .send({ status: true, balance: web3.utils.fromWei(balance, "ether") });
  } catch (error) {
    res.status(500).send({ status: false, message: "Get BNB Balance Failed" });
  }
}

async function getTokenBalance(req, res) {
  // Set web3
  const web3 = new Web3(
    req.body.network && req.body.network === "MAINNET"
      ? process.env.MAINNET
      : process.env.TESTNET
  );

  try {
    // contract instance
    const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
    const balance = await contract.methods.balanceOf(req.body.address).call();
    const decimals = await contract.methods.decimals().call();
    res.status(200).send({ status: true, balance: balance / 10 ** decimals });
  } catch (error) {
    res
      .status(500)
      .send({ status: false, message: "Get Token Balance Failed" });
  }
}

async function transfer(req, res) {
  // Set web3
  const web3 = new Web3(
    req.body.network && req.body.network === "MAINNET"
      ? process.env.MAINNET
      : process.env.TESTNET
  );

  try {
    // Sign transaction
    let signTransaction = await web3.eth.accounts.signTransaction(
      {
        to: req.body.to,
        value: web3.utils.toWei(req.body.amount, "ether"),
        gas: req.body.gas || 2000000,
      },
      req.body.from_private_key
    );

    // Transaction
    let tx = await web3.eth.sendSignedTransaction(
      signTransaction.rawTransaction
    );

    res.status(200).send({ status: true, hash: tx.transactionHash });
  } catch (error) {
    res.status(500).send({ status: false, message: "Transfer Failed" });
  }
}
/*
async function transferToken(req, res) {
    // Set web3
    const web3 = new Web3(req.body.network && req.body.network === "MAINNET" ? process.env.MAINNET : process.env.TESTNET);

    try {
        // contract instance
        const contract = await new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
        const decimals = await contract.methods.decimals().call();
        // transfer event abi
        const transferAbi = await contract.methods.transfer(req.body.to, (req.body.amount * 10**decimals).toString()).encodeABI();

        // Sign transaction
        let signTransaction = await web3.eth.accounts.signTransaction({
            to: process.env.CONTRACT_ADDRESS,
            data: transferAbi,
            gas: req.body.gas || 2000000
        }, req.body.from_private_key);

        // Transaction
        let tx = await web3.eth.sendSignedTransaction(
            signTransaction.rawTransaction
        );
        
        res.status(200).send({ status: true, hash: tx.transactionHash });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Transfer Failed' });
    }
}
*/

async function transferToken(from, to, amount) {
  // Set web3
  const web3 = new Web3(process.env.TESTNET);
  console.log(process.env.TESTNET);

  try {
    // var contract = new web3.eth.Contract(abi, process.env.TOKEN_ADDRESS);
    // var myMethod = contract.methods.transfer(to, (amount * 10** 18).toString());
    // var encodedABI = myMethod.encodeABI()

    // const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

    // var tx = {
    //   from: account.address,
    //   to: process.env.TOKEN_ADDRESS,
    //   gas: 2000000,
    //   data: encodedABI
    // };

    // console.log("Account Address:", account.address);

    // account.signTransaction(tx).then(signed => {
    //   var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);
    //   console.log("Raw Signed Transaction:", signed.transactionHash);
    // });

    // contract instance
    const contract = await new web3.eth.Contract(
      abi,
      process.env.TOKEN_ADDRESS
    );
    // console.log(contract);
    // const decimals = await contract.methods.decimals().call();
    // transfer event abi
    console.log("ammount: ", (amount * 10 ** 18).toString());
    const balance = await contract.methods.balanceOf(to).call();

    console.log("balance", balance);

    const transferAbi = await contract.methods
      .transfer(to, (amount * 10 ** 18).toString())
      .encodeABI();

    console.log("transferAbi: ", transferAbi);

    // Sign transaction
    let signTransaction = await web3.eth.accounts.signTransaction(
      {
        // from: from,
        to: process.env.TOKEN_ADDRESS,
        data: transferAbi,
        gas: 2000000,
      },
      process.env.PRIVATE_KEY
    );
    console.log(signTransaction);

    // Transaction
    let tx = await web3.eth.sendSignedTransaction(
      signTransaction.rawTransaction
    );

    // res.status(200).send({ status: true, hash: tx.transactionHash });
    console.log("hash: ", tx.transactionHash);
  } catch (error) {
    // res.status(500).send({ status: false, message: 'Transfer Failed' });
    console.log("error: ", error);
  }
}
module.exports = {
  createAccount,
  getBalance,
  getTokenBalance,
  transfer,
  transferToken,
};

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    localGeth: {
      from: "0x0000000000000000000000000000000000000001",
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }
  }
};

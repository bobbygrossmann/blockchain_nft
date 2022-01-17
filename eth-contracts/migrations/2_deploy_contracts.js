// migrating the appropriate contracts
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
const Verifier = artifacts.require("./Verifier.sol");

module.exports = function(deployer) {
  const name = "STARLITE";
  const symbol = "LIT";

  deployer.deploy(Verifier);
  deployer.deploy(SolnSquareVerifier, name, symbol);
};

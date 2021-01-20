var ErcToken = artifacts.require("./ErcToken.sol");
module.exports = function(deployer) {
    deployer.deploy(ErcToken,'Lisa', 'L', 1000, 0);
};

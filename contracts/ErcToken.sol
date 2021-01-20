pragma solidity >=0.4.22 <0.7.0;

contract ErcToken {

    string public name;
    string public symbol;
    uint256 public nbOfholder;
    uint256 public totalSupply;

    // Map des adresses
    mapping(address => uint) public balances;

    // Constructeur pour assigner les tokens au owner du contrat
    constructor(string memory _name, string memory _symbol, uint _totalSupply, uint _nbOfholder) public {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        balances[msg.sender] = totalSupply;
        nbOfholder = _nbOfholder;
    }

    function transfer(address _to, uint tokens) public returns (bool success){
        require(balances[msg.sender] >= tokens, "Pas assez de fonds...");
        balances[msg.sender] -= tokens;
        balances[_to] += tokens;
        nbOfholder ++;
        return true;
    }

    function getNbHolder() public view returns (uint256){
        return nbOfholder;
    }

    function getName() public view returns (string memory){
        return name;
    }

    function getSymbol() public view returns (string memory){
        return symbol;
    }

    function getTotalSupply() public view returns (uint256){
        return totalSupply;
    }

    function getBalance(address _balanceAddress) public view returns (uint){
        return balances[_balanceAddress];
    }

    function initBalance(uint128 _valeur) public returns (bool success){
        balances[msg.sender] = _valeur;
        return true;
    }
}

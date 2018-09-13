pragma solidity ^0.4.21;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Token is ERC721Token, Ownable {

    event TokenCreated(address _receiver, uint _tokenId, uint _tokenURI);

    uint price;
    uint totalValueStored = 0;

    constructor(string _name, string _symbol, uint _startingPrice) ERC721Token(_name, _symbol) public { 
        price = _startingPrice;
    }

    /**
    * @dev Mints a token to an address with a tokenURI.
    * @param _to address of the future owner of the token
    * @param _tokenURI token URI for the token
    */

    function mintTo(address _to, string _tokenURI) public payable {
        require(msg.value >= price);
        require(msg.sender != address(0));
        uint256 newTokenId = _getNextTokenId();
        _mint(_to, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        totalValueStored += msg.value;
    }

    function changePrice(uint _newPrice) onlyOwner public {
        price = _newPrice;
    }

    function withdraw() onlyOwner public {
        owner.transfer(totalValueStored);
    }
    /**
    * @dev calculates the next token ID based on totalSupply
    * @return uint256 for the next token ID
    */
    function _getNextTokenId() private view returns (uint256) {
        return totalSupply().add(1); 
    }

    function() public payable {
        revert();
    }
}

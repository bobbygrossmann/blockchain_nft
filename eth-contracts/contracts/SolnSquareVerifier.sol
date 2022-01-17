pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import "./Verifier.sol";
import "./ERC721Mintable.sol";
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract SolnSquareVerifier is CustomERC721Token {

    Verifier public verifier;
    SolutionsStruct[] solutions;

    mapping(uint256 => SolutionsStruct) submittedSolutions;

    event SolutionIsAdded(SolutionsStruct solutionsStruct);
    event SolutionsIsMinted(uint256 _index, address _address);


    constructor (string memory name, string memory symbol)
        CustomERC721Token(name, symbol) public
    { 
        verifier = Verifier(msg.sender);
    }

    struct SolutionsStruct {
        uint256 _index;
        address _address;
    }

    function addSolution(uint256 _index, address _address) public
    {
      
        SolutionsStruct memory solutionStruct = SolutionsStruct( _index, _address );
        solutions.push(solutionStruct);
        submittedSolutions[_index] = solutionStruct;

        emit SolutionIsAdded(solutionStruct);
    }

    modifier solutionIsUnique(uint256 _index, address _address)
    {
        require (submittedSolutions[_index]._address == address(0), 'Solution already added');
        _;
    }

    function mintNewNFT(uint256 _index, address _address) 
        public solutionIsUnique(_index,_address) returns(bool) 
    {
        addSolution(_index, _address);
        super.mint(_address, _index);

        return true;
    }
}

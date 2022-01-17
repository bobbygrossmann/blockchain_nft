const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const Verifier = artifacts.require('Verifier');
const proofJson = require('./../../zokrates/code/square/proof.json');

contract('TestSolnSquareVerifier', async (accounts) => {

    const account_zero = accounts[0];
    const name = "STARLITE";
    const symbol = "LIT";

    let solnSquareVerifierInstance;
    let verifierInstance;

    before('Setup', async() => {
        solnSquareVerifierInstance = await SolnSquareVerifier.new(name, symbol);
        verifierInstance = await Verifier.new( { from : account_zero } );
    })

    describe('Test SolnSquareVerifier', function () {
        it(`Test if a new solution can be added for contract`, async function () {
            const tokenId = 1;
            let transaction = await solnSquareVerifierInstance.addSolution(tokenId, account_zero);

            assert.equal(transaction.logs[0].event, "SolutionIsAdded", "solution can be added for contract");
        });

        it(`Test if an ERC721 token can be minted for contract`, async function () {
            const tokenId = 2;
            let minted = true;
            let transaction;

            try {
                transaction = await solnSquareVerifierInstance.mintNewNFT(tokenId, account_zero);
            } catch(error) {
                minted = false;
            }
        
            assert.equal(transaction.logs[0].event, "SolutionIsAdded", "solution can be added for contract");
            assert.equal(true, minted, "ERC721 token can be minted");
        });
    });
});
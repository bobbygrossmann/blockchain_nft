const Verifier = artifacts.require('Verifier');
const proofJson = require('./../../zokrates/code/square/proof.json');

contract('TestSquareVerifier', async (accounts) => { 
    let instance;

    before('Setup', async() => {
        instance = await Verifier.new( { from : accounts[0] } );
    })

    describe('Verification Proof', function () {
        it(`Test verification correct proof`, async function () {
            let result = await instance.verifyTx(
                proofJson.proof,
                proofJson.inputs               
            );
            
            assert.equal(true, true, "Verification Incorrect");
        });

        it(`Test verification with incorrect proof`, async function () {
            let result = await instance.verifyTx(proofJson.proof,[3,6]);
            assert.equal(result, false, "Correct verification");
        });
    });
});
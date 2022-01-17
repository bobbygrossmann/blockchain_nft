const ERC721Mintable = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    const mintedCounter = 4;
    const name = "STARLITE";
    const symbol = "LIT";

    before('Test setup', async() => {
        instance = await ERC721Mintable.new(name, symbol);
        
        for (let x = 0; x < mintedCounter; x++) {
            await instance.mint(accounts[x], x, { from : account_one });
        }
    })

    describe('match erc721 spec', function () {
        it('should return total supply', async function () { 
            let total = await instance.totalSupply();

            assert.equal(total, mintedCounter, "total supply is incorrect");
        })

        it('should get token balance', async function () { 
            let balance = await instance.balanceOf(account_two);
            assert.equal(balance, 1, "token balance is incorrect");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            const tokenURI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2';
            let URI = await instance.tokenURI(2);

            assert.equal(URI, tokenURI, "token uri is incorrect");
        })

        it('should transfer token from one owner to another', async function () { 
            await instance.approve(account_one, 2, { from : account_three });
            await instance.transferFrom(account_three, account_one, 2, { from : account_three });
            
            let balance = await instance.balanceOf(account_one);
            assert.equal(balance, 2, "the balance is incorrect");
        })
    });

    describe('have ownership properties', function () {
        it('should fail when minting when address is not contract owner', async function () { 
            let hasFailed = false;

            try {
                await instance.mint(account_one, 4, { from : account_two });
            } catch(error) {
                hasFailed = true;
            }

            assert.equal(hasFailed, true, "not the contract owner");   
        })

        it('should return contract owner', async function () { 
            let owner = await instance.getOwner();

            assert.equal(owner, account_one, "not the contract owner");
        })
    });
})
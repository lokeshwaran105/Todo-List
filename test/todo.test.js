const {expect} = require('chai');
const { ethers } = require('hardhat/internal/lib/hardhat-lib');


let todo_abi;
let todo;
let account;

describe("TodoList Application...", function () {
    
    before("Deploying TODO Smart Contract...", async function(){
        todo_abi = await ethers.getContractFactory('TodoList');
        todo = await todo_abi.deploy();
        [account] = await ethers.getSigners();
        console.log("Successfully Deployed");
    });

    it("Create Task Functionality Checking...", async function(){

        await todo.createTask("This is my application");
        const task = await todo.getSingleTask(1);
        const [ID, creator, message, status] = task;

        expect(ID).to.equal(BigInt(1));
        expect(creator).to.equal(account.address);
        expect(message).to.equal("This is my application");
        expect(status).to.equal(false);

    });

    it("Edit functionality checking...", async function(){

        await todo.editTask("Hi", 1);
        const task = await todo.getSingleTask(1);
        const [ID, creator, message, status] = task;

        expect(ID).to.equal(BigInt(1));
        expect(creator).to.equal(account.address);
        expect(message).to.equal("Hi");
        expect(status).to.equal(false);

    });

    it("Checking Toggle functionality...", async function(){

        await todo.toggle(1);
        const task = await todo.getSingleTask(1);
        const [ID, creator, message, status] = task;

        expect(ID).to.equal(BigInt(1));
        expect(creator).to.equal(account.address);
        expect(message).to.equal("Hi");
        expect(status).to.equal(true);

    })
});

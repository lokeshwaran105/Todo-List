const { ethers } = require('hardhat/internal/lib/hardhat-lib');

async function main() {
 
  const todo_abi = await ethers.getContractFactory("TodoList");
  const todo = await todo_abi.deploy();
  console.log("ToDo List deployed to:", await todo.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
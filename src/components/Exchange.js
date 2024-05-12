import { useEffect, useState } from 'react';
import {todo_addr} from '../config';
import  Web3Modal  from 'web3modal';
import todo from '../artifacts/contracts/ToDo.sol/TodoList.json';
import { ethers } from 'ethers';


function Exchange() {

    const [userMessage, setUserMessage] = useState("");
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks(){
        const provider=new ethers.BrowserProvider(window.ethereum);
        const signer= await provider.getSigner();
        const abi = todo.abi;
        let contract=new ethers.Contract(todo_addr, abi, signer);
        const data = await contract.getTask();

        const u_data = await Promise.all(data.map(async i => {
            const user = {
                Id: i.task_ID,
                creator: i.creator.toString(),
                message: i.message.toString(),
                status: i.status
            }

            return user;
        }));

        setUserData(u_data);
    }

    console.log(userData);

    async function completeTask(id){
        console.log(id);
        const web3 = new Web3Modal();
        const connection = await web3.connect();
        const provider=new ethers.BrowserProvider(connection);
        const signer= await provider.getSigner();
        const abi = todo.abi;
        let contract=new ethers.Contract(todo_addr, abi, signer);
        const tx = await contract.toggle(id);
        await tx.wait();

        console.log("Success");

    }

    async function deleteTask(id){
        console.log(id);
        const web3 = new Web3Modal();
        const connection = await web3.connect();
        const provider=new ethers.BrowserProvider(connection);
        const signer= await provider.getSigner();
        const abi = todo.abi;
        let contract=new ethers.Contract(todo_addr, abi, signer);
        const tx = await contract.deleteTask(id);
        await tx.wait();

        console.log("Success");
    }

    async function createTasks() {
        
        const web3 = new Web3Modal();
        const connection = await web3.connect();
        const provider=new ethers.BrowserProvider(connection);
        const signer= await provider.getSigner();
        const abi = todo.abi;
        let contract=new ethers.Contract(todo_addr, abi, signer);
        const tx = await contract.createTask(userMessage);
        await tx.wait();

    }

    function showCreateTask() {
        document.getElementById('create-task').style.display = "block";
        document.getElementById('pending-task').style.display = "none";
        document.getElementById('completed-task').style.display = "none";
    }

    function showPendingTask() {
        document.getElementById('create-task').style.display = "none";
        document.getElementById('pending-task').style.display = "block";
        document.getElementById('completed-task').style.display = "none";

        
    }

    function showCompletedTask() {
        document.getElementById('create-task').style.display = "none";
        document.getElementById('pending-task').style.display = "none";
        document.getElementById('completed-task').style.display = "block";
    }

    return(
        
        <div className="container">
                <div className="card">
                    <div className="todo-menu">
                        <h2>TODO MENU</h2>
                        <ul>
                            <li className="menu" onClick={showCreateTask}>Create Task</li>
                            <li className="menu" onClick={showPendingTask}>Pending Task</li>
                            <li className="menu" onClick={showCompletedTask}>Completed Task</li>
                        </ul>
                    </div>
                    <div className="todo-result" id="create-task" style={{display:"block"}}>
                        <h2 className='create-h2'>Create Task</h2>
                        <div className="todo-create">
                            <input type="text" placeholder="Type your text" className="create-task" onChange={(e)=>setUserMessage(e.target.value)}/>
                            <button onClick={createTasks}>CREATE</button>
                        </div>
                    </div>
                    <div className="todo-result" id="pending-task" style={{display:"none"}}>
                        <h2>Pending Tasks</h2>
                        <table className="todo-table">
                        
                            <tr>
                                <th style={{width: "60%"}}>Tasks</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            {
                                userData.filter(data => data.message !== "" && data.status == false).map((data, i) => (
                                    <tr key={i}>
                                        <td> {data.message} </td>
                                        <td className="task-status">Pending</td>
                                        <td className="action-btn">
                                            <button onClick={() => completeTask(data.Id)} className='complete'>Complete</button>
                                            <button onClick={() => deleteTask(data.Id)} className='delete'>Delete</button>
                                        </td>
                                    </tr>

                                ))
                            }
                        </table>
                    </div>
                    <div className="todo-result" id="completed-task" style={{display:"none"}}>
                        <h2>Completed Tasks</h2>
                        <table className="todo-table">
                            <tr>
                                <th style={{width: "80%"}}>Tasks</th>
                                <th>Status</th>
                            </tr>
                            {
                                userData.filter(data => data.status == true).map((data, i) => (
                                    <tr key={i}>
                                        <td className="description">{data.message}</td>
                                        <td className="task-status">Completed</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div> 
                </div>
        </div>
    );
}

export default Exchange;
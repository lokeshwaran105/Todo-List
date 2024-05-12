// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract TodoList {
    
    address public owner;
    uint256 public _taskID;
    uint256 public _taskCount;

    struct Task{
        uint256 task_ID;
        address creator;
        string message;
        bool status;
    }

    mapping (address => Task[]) todo_List;

    event CreateTask(uint256 indexed task_ID, address indexed creator, string indexed message, bool status);
    event CompleteTask(uint256 indexed task_ID, address indexed creator, string indexed message, bool status);
    event UpdateTask(uint256 indexed task_ID, address indexed creator, string indexed message);
    event DeleteTask(uint256 indexed task_ID, address indexed creator, string indexed message);


    constructor() {
        owner = msg.sender;
    }
    

    function createTask(string calldata _message) public  {
        _taskID++;
        _taskCount++;

        todo_List[msg.sender].push(Task(
            _taskID,
            msg.sender,
            _message,
            false
        ));

        emit CreateTask(_taskID, msg.sender, _message, false);

    }

    function getSingleTask(uint256 _id) public view returns(uint taskid, address creator, string memory message, bool status){

        Task[] storage usertasks = todo_List[msg.sender];

        for(uint i=0; i<usertasks.length; i++){
            if(todo_List[msg.sender][i].task_ID == _id){
                return(
                    todo_List[msg.sender][i].task_ID,
                    todo_List[msg.sender][i].creator,
                    todo_List[msg.sender][i].message,
                    todo_List[msg.sender][i].status

                );
            }
        }
    }

    function getTask() public view returns(Task[] memory) {

        return todo_List[msg.sender];
    }

    function toggle(uint256 _id) public {

        Task[] storage usertasks = todo_List[msg.sender];

        for(uint i=0; i<usertasks.length; i++){
            if(todo_List[msg.sender][i].task_ID == _id){
                todo_List[msg.sender][i].status = true;
                emit CompleteTask(_id, msg.sender, todo_List[msg.sender][i].message, true);
                break;
            }
        }
    }

    function completedTasks() public view  returns(Task[] memory){

        uint count = 0;
        Task[] storage usertasks = todo_List[msg.sender];

        for(uint i=0; i<usertasks.length; i++){
            if(todo_List[msg.sender][i].status == false){
                count++;
            }
        }

        Task[] memory item = new Task[](count);

        for(uint i=0; i<count; i++){

            if(todo_List[msg.sender][i].status == true){
                item[i] = todo_List[msg.sender][i];
            }
        }
        return item;

    }

    function pendingTasks() public view returns(Task[] memory){

        uint count = 0;
        Task[] storage usertasks = todo_List[msg.sender];

        for(uint i=0; i<usertasks.length; i++){
            if(todo_List[msg.sender][i].status == false){
                count++;
            }
        }

        Task[] memory item = new Task[](count);

        for(uint i=0; i<count; i++){

            if(todo_List[msg.sender][i].status == false){
                item[i] = todo_List[msg.sender][i];
            }
        }
        

        return item;

    }

    function editTask(string calldata _newMessage, uint256 _id) public {
        Task[] storage usertasks = todo_List[msg.sender];

        for(uint i=0; i<usertasks.length; i++){
            if(todo_List[msg.sender][i].task_ID == _id){
                todo_List[msg.sender][i].message = _newMessage;
                emit UpdateTask(_id, msg.sender, _newMessage);
                break;
            }
        }
    }

    function deleteTask(uint256 _id) public {
        Task[] storage usertasks = todo_List[msg.sender];

        for(uint i=0; i<usertasks.length; i++){
            if(todo_List[msg.sender][i].task_ID == _id){
                delete todo_List[msg.sender][i];
                emit DeleteTask(_id, msg.sender, todo_List[msg.sender][i].message);
                break;
            }
        }
    }

}
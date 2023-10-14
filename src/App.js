import "./App.css";
import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";

function App() {
  const [isComplete, setIsComplete] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddToDo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewTitle(""); // Clear the input field after adding
    setNewDescription(""); // Clear the input field after adding
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    // Remove the completed task from the "Todo" list
    let updatedTodoArr = allTodos.filter((_, i) => i !== index);

    // Add the completed task to the "Completed" list
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);

    setAllTodos(updatedTodoArr);
    setCompletedTodos(updatedCompletedArr);

    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    localStorage.setItem("completedList", JSON.stringify(updatedCompletedArr));
  };


  function handleDelete(index, isCompleted) {
    if (isCompleted) {
      // If the task is in the "Completed" list, remove it from there
      let reducedCompleted = [...completedTodos];
      reducedCompleted.splice(index, 1);
      setCompletedTodos(reducedCompleted);
      localStorage.setItem("completedList", JSON.stringify(reducedCompleted));
    } else {
      // If the task is in the "Todo" list, remove it from there
      let reducedToDo = [...allTodos];
      reducedToDo.splice(index, 1);
      setAllTodos(reducedToDo);
      localStorage.setItem("todolist", JSON.stringify(reducedToDo));
    }
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompleted = JSON.parse(localStorage.getItem("completedList"));

    if (savedTodo) {
      setAllTodos(savedTodo);
    }

    if (savedCompleted) {
      setCompletedTodos(savedCompleted);
    }
  }, []);

  return (
    <div className="h-screen bg-black text-white">
      <div>
        <h1 className="text-center font-extrabold font-sans text-[35px]">
          Add Your Daily Activities Todo
        </h1>
      </div>

      <div className="bg-[#353434] p-[2%] w-fit ml-auto mr-auto mt-[3%] max-h-[80vh] overflow-y-auto mb-34">
        <div className="flex align-center justify-center border-b pb-[25px] mb-[25px] border-stone-300">
          <div className="flex flex-col mr-[25px]">
            <label className="font-800 mb-[10px]">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
              className="p-[8px] border-none w-[250px] text-black"
            />
          </div>

          <div className="flex flex-col mr-[25px]">
            <label className="font-800 mb-[10px]">Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
              className="p-[8px] border-none w-[250px] text-black"
            />
          </div>

          <div>
            <button className="primary" onClick={handleAddToDo}>
              Add
            </button>
          </div>
        </div>

        <div className="flex flex-row">
          <button
            className={`secondary ${!isComplete && "active"}`}
            onClick={() => setIsComplete(false)}
          >
            Todo
          </button>
          <button
            className={`secondary ${isComplete && "active"}`}
            onClick={() => setIsComplete(true)}
          >
            Completed
          </button>
        </div>

        <div className="flex flex-col">
          {!isComplete &&
            allTodos.map((item, index) => {
              return (
                <div
                  className="bg-[rgb(44,44,44)] flex justify-between p-[25px] pb-[10px] pt-[10px] mt-[12px] flex-row"
                  key={index}
                >
                  <div className="flex flex-col">
                    <h1 className="text-[25px] text-[rgb(0,220,122)] font-bold margin-0">
                      {item.title}
                    </h1>
                    <p className="text-[14px] text-[rgb(161,161,161)] mt-0">
                      {item.description}
                    </p>
                  </div>

                  <div className="text-[35px] cursor-pointer  flex flex-row mt-3 gap-3">
                    <div>
                      <AiFillDelete
                        className="text-[rgb(0,230,122)] hover:text-red-500"
                        onClick={() => handleDelete(index)}
                      />
                    </div>

                    <div>
                      <AiOutlineCheck
                        className="text-[rgb(0,230,122)] hover:text-[rgb(4,196,106)]"
                        onClick={() => handleComplete(index)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

          {isComplete &&
            completedTodos.map((item, index) => {
              return (
                <div
                  className="bg-[rgb(44,44,44)] flex justify-between p-[25px] pb-[10px] pt-[10px] mt-[12px] flex-row"
                  key={index}
                >
                  <div className="flex flex-col">
                    <h1 className="text-[25px] text-[rgb(0,220,122)] font-bold margin-0">
                      {item.title}
                    </h1>
                    <p className="text-[14px] text-[rgb(161,161,161)] mt-0">
                      {item.description}
                    </p>
                    <p className="text-[14px] text-[rgb(161,161,161)] mt-0">
                      <small>Completed on : {item.completedOn}</small>
                    </p>
                  </div>

                  <div className="text-[35px] cursor-pointer  flex flex-row mt-3 gap-3">
                    <div>
                      <AiFillDelete
                        className="text-[rgb(0,230,122)] hover:text-red-500"
                        onClick={() => handleDelete(index,true)}
                      />
                    </div>
                  </div>
                  
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;

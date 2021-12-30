import "./styles.css";
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import Footer from "./Components/Footer";
import About from "./Components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import AddTaskForm from "./Components/AddTaskForm";
import Context from "./Components/Context";
import ShowContext from "./Components/Context";

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      Name: "Doctor Appointment",
      Day: "feb 5th at 2:30pm",
      Reminder: true
    },
    {
      id: 2,
      Name: "Meeting at School",
      Day: "feb 6th at 1:30pm",
      Reminder: true
    },
    {
      id: 3,
      Name: "Food shopping",
      Day: "feb 5th at 2:30pm",
      Reminder: false
    }
  ]);

  const delTask = (id) => {
    //console.log("Delete: ", id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    //console.log("Toogle: ", id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, Reminder: !task.Reminder } : task
      )
    );
  };

  const AddTask = (task) => {
    //console.log(task);
    const id = Math.floor(Math.random() * 500) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  return (
    <Router>
      <div className="container">
        <ShowContext.Provider value={showAddTask}>
          <Header onBtnAdd={() => setShowAddTask(!showAddTask)} />
        </ShowContext.Provider>
        <Routes>
          <Route
            path="/"
            on
            element={
              <div>
                {showAddTask && <AddTaskForm onAdd={AddTask} />}
                {tasks.length > 0 ? (
                  <Context.Provider value={tasks}>
                    <Tasks onDelete={delTask} onToggle={toggleReminder} />
                  </Context.Provider>
                ) : (
                  "No Task To Show"
                )}
              </div>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

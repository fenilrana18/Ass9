import Task from "./Task";
import Context from "./Context";
import { useContext } from "react";
export default function Tasks({ onDelete, onToggle }) {
  const ctasks = useContext(Context);
  //console.log(ctasks);
  return (
    <>
      {ctasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
}

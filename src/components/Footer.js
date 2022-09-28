import { useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";

export default function Footer() {
    const {data: todos} = useGetTodosQuery();
    const { color } = useSelector((state) => state.filter);
    
    const todosRemaining = color ? todos?.filter((todo) => todo.completed && todo.color === color).length : todos?.filter((todo) => todo.completed).length;

    const numberOfTodos = (no_of_todos = 0) => {
        switch (no_of_todos) {
            case 0:
                return "No task";
            case 1:
                return "1 task";
            default:
                return `${no_of_todos} tasks`;
        }
    };

    return (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
            <p>{numberOfTodos(todosRemaining)} completed</p>
        </div>
    );
}

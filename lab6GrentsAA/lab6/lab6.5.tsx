type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

type ToggleTodo = (id: number) => void;
type AddTodo = (text: string) => void;

interface TodoListProps {
    todos: Todo[];
    toggleTodo: ToggleTodo;
    addTodo: AddTodo;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, addTodo }) => {
    const handleToggle = (id: number) => {
        toggleTodo(id);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const input = e.target as HTMLInputElement;
        if (input.value.trim() !== "") {
            addTodo(input.value.trim());
            input.value = "";
        }
    };

    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        onClick={() => handleToggle(todo.id)}
                        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                    >
                        {todo.text}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Add new todo" />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
};

const initialTodos: Todo[] = [
    { id: 1, text: "Learn TypeScript", completed: false },
    { id: 2, text: "Build a todo app", completed: false }
];

let nextId = 3;

const App: React.FC = () => {
    const [todos, setTodos] = React.useState<Todo[]>(initialTodos);

    const toggleTodo: ToggleTodo = id => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const addTodo: AddTodo = text => {
        setTodos([...todos, { id: nextId++, text, completed: false }]);
    };

    return (
        <div>
            <TodoList todos={todos} toggleTodo={toggleTodo} addTodo={addTodo} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));

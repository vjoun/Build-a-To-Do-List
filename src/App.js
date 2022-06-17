import {
    Button,
    Card,
    Checkbox,
    ControlGroup,
    Elevation,
    InputGroup,
    Tag,
} from "@blueprintjs/core"
import { useState } from "react"

function App() {
    const [userInput, setUserInput] = useState("")

    const [todoList, setTodoList] = useState([])

    const addItem = e => {
        e.preventDefault()
        const trimmedUserInput = userInput.trim()
        if (trimmedUserInput) {
            setTodoList(existingItems => [
                ...existingItems,
                { name: trimmedUserInput, finished: false },
            ])
            setUserInput("")
        }
    }

    const toggleTask = index => {
        setTodoList(existingItems =>
            existingItems.map((item, i) =>
                index === i ? { ...item, finished: !item.finished } : item
            )
        )
    }

    const deleteTask = index => {
        setTodoList(existingItems => existingItems.filter((item, i) => index !== i))
    }

    return (
        <div className="App">
            <Card elevation={Elevation.TWO}>
                <h2 className="heading">To-do List</h2>
                <form onSubmit={addItem}>
                    <ControlGroup fill={true} vertical={false}>
                        <InputGroup
                            placeholder="Add a task..."
                            value={userInput}
                            onChange={e => setUserInput(e.target.value)}
                        />
                        <Button className="button" type="submit" intent="primary">
                            Add Your Task
                        </Button>
                    </ControlGroup>
                </form>
                <div className="items-list">
                    {todoList.map((item, index) => (
                        <Tag
                            key={index + item.name}
                            large
                            minimal
                            multiline
                            onRemove={() => deleteTask(index)}
                        >
                            <Checkbox
                                checked={item.finished}
                                onChange={() => toggleTask(index)}
                            >
                                <span className={item.finished ? "finished" : ""}>
                                    {item.name}
                                </span>
                            </Checkbox>
                        </Tag>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default App

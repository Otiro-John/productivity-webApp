import { useEffect, useRef, useState } from 'react';
import './Productive.css';

const Productive = () => {
    const options = ['Deep Work', 'Shallow Work'];
    const [tasks, setTasks] = useState(() => {
        // Retrieve tasks from localStorage when the component mounts
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const nameOfTask = useRef(null);
    const selectRef = useRef(null);
    const hoursRef = useRef(null);

    const scheduleTasks = () => {
        if (nameOfTask.current.value === '') {
            alert("Add A Task");
        } else {
            const newTask = {
                name: nameOfTask.current.value,
                type: selectRef.current.value,
                hours: parseInt(hoursRef.current.value),
                checked: false
            };
            setTasks([...tasks, newTask]);
            nameOfTask.current.value = '';
            hoursRef.current.value = '';
        }
    };

    const handleCheck = (index) => {
        const updatedTasks = tasks.map((task, i) => 
            i === index ? { ...task, checked: !task.checked } : task
        );
        setTasks(updatedTasks);
    };

    const deleteCheckedTasks = () => {
        const remainingTasks = tasks.filter(task => !task.checked);
        setTasks(remainingTasks);
    };

    useEffect(() => {
        // Save tasks to localStorage whenever they change
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const totalHoursOfDeepWork = tasks
        .filter(task => task.type === 'Deep Work')
        .reduce((total, task) => total + task.hours, 0);

    const totalHoursOfShallowWork = tasks
        .filter(task => task.type === 'Shallow Work')
        .reduce((total, task) => total + task.hours, 0);

    return (
        <div className='wrapper'>
            <div className="title">
                <h1>Be-Productive With Your-Hours</h1>
                <p>Allocate your tasks wisely and finish the <strong>Most Important Task</strong>.</p>
            </div>
            <div className="input-section">
                <input type="text" ref={nameOfTask} placeholder='Name Of The Task' />
                <select ref={selectRef}>
                    {options.map((option, index) => (
                        <option key={index}>{option}</option>
                    ))}
                </select>
                <input type="number" ref={hoursRef} placeholder='Enter The No Of Hours' />
                <button onClick={scheduleTasks}>Schedule</button>
            </div>
            <div className="display-containers">
                <div className="deep-work"><span>{totalHoursOfDeepWork}</span> <p>Hours of Deep Work</p></div>
                <div className="shallow-work"><span>{totalHoursOfShallowWork}</span> <p>Hours of Shallow Work</p></div>
            </div>
            <div className="working-area">
                {tasks.map((task, index) => (
                    <div className="task" key={index}>
                        <h2>{task.name} ({task.type}) - {task.hours} {task.hours === 1 ? "Hour" : "Hours"}</h2>
                        <input 
                            type="checkbox" 
                            checked={task.checked}
                            onChange={() => handleCheck(index)} 
                        />
                    </div>
                ))}
            </div>

            <center>
            <button className='delete' onClick={deleteCheckedTasks}>Delete Checked Task </button>
            </center>
        </div>
    );
}

export default Productive;

import { useState } from "react";

export default function EmployeeTasksForm() {
    const [division, setDivision] = useState("");
    const [employee, setEmployee] = useState("");
    const [points, setPoints] = useState("");
    const [task, setTask] = useState("");
    const [collaborators, setCollaborators] = useState([]);
    const [dueDate, setDueDate] = useState("");

    // Example options
    const divisions = ["Sales", "HR", "Development", "Marketing"];
    const employees = ["Alice", "Bob", "Charlie", "David"];
    const pointsOptions = [10, 20, 30, 50];

    const handleCollaboratorChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCollaborators([...collaborators, value]);
        } else {
            setCollaborators(collaborators.filter((c) => c !== value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            division,
            employee,
            points,
            task,
            collaborators,
            dueDate,
        };
        console.log("Task submitted:", taskData);
        // Reset form
        setDivision("");
        setEmployee("");
        setPoints("");
        setTask("");
        setCollaborators([]);
        setDueDate("");
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Add Employee Task</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* Division */}
                <div>
                    <label className="block mb-1 font-medium">Division</label>
                    <select
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select division</option>
                        {divisions.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Employee */}
                <div>
                    <label className="block mb-1 font-medium">Assign Employee</label>
                    <select
                        value={employee}
                        onChange={(e) => setEmployee(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select employee</option>
                        {employees.map((e) => (
                            <option key={e} value={e}>
                                {e}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Points */}
                <div>
                    <label className="block mb-1 font-medium">Points</label>
                    <select
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select points</option>
                        {pointsOptions.map((p) => (
                            <option key={p} value={p}>
                                +{p}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Task */}
                <div>
                    <label className="block mb-1 font-medium">Task</label>
                    <textarea
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter task description"
                        rows={3}
                        required
                    />
                </div>

                {/* Collaborators */}
                <div>
                    <label className="block mb-1 font-medium">Collaborators</label>
                    <div className="flex flex-wrap gap-2">
                        {employees.map((c) => (
                            <label key={c} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    value={c}
                                    checked={collaborators.includes(c)}
                                    onChange={handleCollaboratorChange}
                                    className="accent-blue-500"
                                />
                                {c}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Due Date */}
                <div>
                    <label className="block mb-1 font-medium">Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
}

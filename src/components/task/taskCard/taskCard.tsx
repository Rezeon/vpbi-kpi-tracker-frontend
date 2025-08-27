import React from "react";

type Task = {
    id: number;
    category: string;
    title: string;
    description: string;
    date: string;
    progress: string;
    image?: string;
};

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    return (
        <div className="flex flex-wrap  shadow-md rounded-2xl p-4 w-fit h-fit border border-gray-200 dark:border-white/[0.05] dark:bg-white/[0.03] break-inside-avoid mb-4">
            {/* Label */}
            <span
                className={`px-3 py-1 text-sm font-semibold rounded-lg text-white ${
                task.category === "Design"
                    ? "bg-purple-500"
                    : task.category === "Research"
                    ? "bg-blue-500"
                    : task.category === "Content"
                    ? "bg-yellow-500"
                    : "bg-orange-500"
                }`}
            >
                {task.category}
            </span>

            {/* Image */}
            {task.image && (
                <img
                src={task.image}
                alt={task.title}
                className="rounded-xl my-3 h-32 w-full object-cover"
                />
            )}

            {/* Title */}
            <h3 className="font-semibold text-md dark:text-white">{task.title}</h3>
            <p className="text-gray-500 text-sm">{task.description}</p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
                <span>{task.date}</span>
                <span>{task.progress}</span>
            </div>
        </div>
    );
};

export default TaskCard;

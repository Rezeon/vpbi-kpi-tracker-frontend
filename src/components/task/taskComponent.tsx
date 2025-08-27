import Button from "../ui/button/Button";
import { useState, useEffect } from "react";
import TaskCard from "./taskCard/taskCard";
import Masonry from "react-masonry-css";

type Task = {
    id: number;
    category: string;
    title: string;
    description: string;
    date: string;
    progress: string;
    image?: string;
};

export default function TaskComponent() {
    const [tasks, setTasks] = useState<Task[]>([]);
    

    useEffect(() => {
        // 🔹 Dummy data (sementara, nanti ganti dengan fetch API)
        const dummyTasks: Task[] = [
        {
            id: 1,
            category: "Design",
            title: "Create styleguide foundation",
            description: "Create content for peceland App",
            date: "Aug 20, 2021",
            progress: "0/8",
            image: "https://picsum.photos/300/200?random=1",
        },
        {
            id: 2,
            category: "Research",
            title: "Auditing information architecture",
            description: "Create content for peceland App",
            date: "Aug 21, 2021",
            progress: "2/5",
        },
        {
            id: 3,
            category: "Planning",
            title: "Listing deliverables checklist",
            description: "Plan for Q4 project",
            date: "Sep 20, 2021",
            progress: "5/10",
            image: "https://picsum.photos/300/200?random=2"
        },
        {
            id: 4,
            category: "Content",
            title: "Update support documentation",
            description: "Write docs for new feature",
            date: "Aug 16, 2021",
            progress: "1/3",
        },
        {
            id: 5,
            category: "Design",
            title: "High fidelity UI Desktop",
            description: "Create Figma mockups",
            date: "Aug 20, 2021",
            progress: "0/8",
            image: "https://picsum.photos/300/200?random=3",
        },
        {
            id: 6,
            category: "Planning",
            title: "Create styleguide foundation",
            description: "Create content for peceland App",
            date: "Aug 20, 2021",
            progress: "0/8",
            
        },
        {
            id: 7,
            category: "Design",
            title: "Create styleguide foundation",
            description: "Create content for peceland App",
            date: "Aug 20, 2021",
            progress: "0/8",
            image: "https://picsum.photos/300/200?random=1",
        },
        {
            id: 8,
            category: "Content",
            title: "Create styleguide foundation",
            description: "Create content for peceland App",
            date: "Aug 20, 2021",
            progress: "0/8",
        },
        {
            id: 9,
            category: "Design",
            title: "Create styleguide foundation",
            description: "Write docs for new feature",
            date: "Aug 20, 2021",
            progress: "0/8",
            image: "https://picsum.photos/300/200?random=1",
        },
    ];

    setTasks(dummyTasks);
    }, []);
    
    // useEffect(() => {
    // fetch("http://localhost:5000/tasks")
    //     .then((res) => res.json())
    //     .then((data: Task[]) => setTasks(data))
    //     .catch((err) => console.error(err));
    // }, []);

    return (
        <>
            <h2 className="text-xl mb-4 dark:text-white">Task</h2>
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
                <Button variant="outline" size="md" className="flex-1 sm:flex-none" >
                Complete
                </Button>
                <Button variant="outline" size="md" className="flex-1 sm:flex-none" >
                To Do
                </Button>
                <Button variant="outline" size="md" className="flex-1 sm:flex-none" >
                In Progress
                </Button>
            </div>

            {/* Grid TaskCard */}
            <Masonry
                breakpointCols={{ default: 4, 1100: 3, 800: 2, 400:1 }}
                className="flex gap-4"
                columnClassName="space-y-4"
            >
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                    ))}
            </Masonry>
        </>
    );
}
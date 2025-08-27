import SendEmail from "../../components/task/sendEmail/sendEmail";
import TaskComponent from "../../components/task/taskComponent"
export default function Task (){
    return (
        <>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Kiri → Task board */}
                <div className="flex-1">
                    <TaskComponent />
                </div>

                {/* Kanan → Sidebar */}
                <div className="w-full md:w-[300px] shrink-0">
                    <div className="sticky top-0">
                        <SendEmail />
                    </div>
                </div>
            </div>
        </>
    );
}

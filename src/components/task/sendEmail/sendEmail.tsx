import { useState, useEffect } from "react";
import Input  from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import ComponentCard  from "../../common/ComponentCard";
import Button from "../../ui/button/Button";
import Alert from "../../ui/alert/Alert";

export default function SendEmail() {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState<{
    variant: "success" | "warning";
    title: string;
    message: string;
    } | null>(null);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError(!/\S+@\S+\.\S+/.test(e.target.value));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (error || !email || !subject || !message) {
            setAlert({
                variant: "warning",
                title: "Warning Message",
                message: "Please fill all fields correctly.",
            });
            return;
        }
        setAlert({
            variant: "success",
            title: "Success Message",
            message: "Your email has been sent successfully.",
        });
        setEmail("");
        setSubject("");
        setMessage("");
        setError(false);
    };
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
            setAlert(null);
            }, 3000); // 3 detik
            return () => clearTimeout(timer);
        }}, [alert]);

    return (
        
            <ComponentCard title="Send Email">
                {alert && (
                    <div className="mb-4">
                        <Alert
                            variant={alert.variant}
                            title={alert.title}
                            message={alert.message}
                            showLink={false}
                        />
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
                    <div className="space-y-4">
                        <Input
                            type="email"
                            value={email}
                            error={error}
                            onChange={handleEmailChange}
                            placeholder="Enter to..."
                            hint={error ? "This is an invalid email address." : ""}
                            className="w-full"
                        />
                        <Input type="text" 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Subject"
                            className="w-full"
                        />
                        <TextArea
                            value={message}
                            onChange={(value) => setMessage(value)}
                            rows={13}
                            className="w-full"
                        />
                        <Button className="w-full">
                            Send Email
                        </Button>
                    </div>
                </form>
            </ComponentCard>
    );
}

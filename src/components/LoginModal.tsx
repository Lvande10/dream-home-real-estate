import { useUser } from "@/app/userContext";
import axios from "axios";
import { useEffect } from "react";
import { Form, Input, Button, Modal, ModalContent, ModalBody, ModalHeader } from "@heroui/react";

interface LoginProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onOpen, onClose }: LoginProps) {
    const user = useUser();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement));
        console.log("Login data submitted:", data);

        handleAuth(data.username as string, data.password as string);
    }

    const handleAuth = async (username: string, password: string) => {

        const authResponse = await axios.post("http://localhost:3000/api/auth", { username, password });

        if (authResponse.status == 200) {
            console.log("Authentication response:", authResponse.data.profile);

            user.setIsAuthenticated(true);
            user.setUser(authResponse.data.profile);

            onClose();
        } else {
            console.error("Authentication failed:", authResponse.data.error);
            alert("Invalid username or password");
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} className="mx-auto mt-10">
            <ModalContent>
                <ModalHeader className="flex flex-col">
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                </ModalHeader>
                <ModalBody>
                    <Form className="w-full mx-auto"
                        onSubmit={onSubmit}>
                        <Input label="Username" name="username" placeholder="Enter your username" className="mb-4" />
                        <Input type="password" label="Password" name="password" placeholder="Enter your password" className="mb-4" />
                        <Button type="submit" color="primary" className="w-full">
                            Login
                        </Button>
                    </Form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
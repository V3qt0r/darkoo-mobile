import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./SetPassword.module.scss";

const SetPassword: React.FC = () => {
    const [password, SetPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL;

    const handleSubmit = async () => {

        const ConfirmPassword = {
            password: password,
        };
        try {
            setLoading(true);

            const response = await fetch(
                `${baseUrl}/users/confirm-password`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(ConfirmPassword),
                }
            );

            if (!response.ok){
                alert("Incorrect password provided");
                throw new Error(("Confirm password failed! Please try again"))
            }

            const result = await response.json()
            console.log("Password confirmation successful! ", result);

            alert("Password Confirmation successful! Redirecting to profile...")
            router.push("/login")
        } catch(error) {
            console.log("Error during password confirmation: ", error);
            alert("Registration failed please try again");
        }finally {
            setLoading(false)
        }
    };

    return(
        <div className={styles.background}>
        <div className={styles.container}>
            <h1>Confirm Password</h1>

            <div className={styles.inputField}>
                <input type="password" value={password} onChange ={(e) => SetPassword(e.target.value)}
                placeholder="Confirm Password" />
            </div>

            <button className={styles.submitButton} 
            onClick={handleSubmit}
            disabled={loading}> {loading ? "Submitting..." : "Submit"}</button>
        </div>
        </div>
    );
};

export default SetPassword;
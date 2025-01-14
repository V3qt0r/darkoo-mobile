import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./ConfirmPassword.module.scss";

const ConfirmPassword: React.FC = () => {
    const router = useRouter();
    const [confirmPassword, setConfirmPassword] = useState("");
    const baseUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL;
    const [loading, setLoading] = useState(false);

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            // Retrieve the stored data from localStorage
            const storedData = localStorage.getItem("registerData");
            if (!storedData) {
                alert("No registration data found. Please start the registration process again.");
                return;
            }

            const formData = JSON.parse(storedData);

            // Check if passwords match
            if (formData.password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return;
            }

            // Send data to backend for registration
            setLoading(true)
            const response = await fetch(`${baseUrl}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Registration successful!");
                localStorage.removeItem("registerData"); // Clear stored data
                router.push("/login"); // Redirect to login page
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
          setLoading(false)
        }
    };

    return(
        <div className={styles.background}>
        <div className={styles.container}>
            <h1>Confirm Password</h1>

            <div className={styles.inputField}>
                <input type="password" value={confirmPassword} onChange ={handleConfirmPasswordChange}
                placeholder="Confirm Password" />
            </div>

            <button className={styles.submitButton} 
            onClick={handleSubmit}
            disabled={loading}> {loading ? "Submitting..." : "Submit"}</button>
        </div>
        </div>
    );
};

export default ConfirmPassword;

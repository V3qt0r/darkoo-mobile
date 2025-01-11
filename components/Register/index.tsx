import React, {useState } from "react";
import { useRouter } from "next/router";
import styles from "./Register.module.scss";


const Register: React.FC = () => {
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL;
    const [formData, setFormData] = useState({
        password: "",
        email: "",
        gender: "",
        isAbove18: false,
    });

    //Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        
        setFormData((prev) => ({
            ...prev,
            [name]: e.target instanceof HTMLInputElement && (e.target.type === "checkbox" || e.target.type === "radio")
                    ? e.target.checked
                    : value,
        }));
    };

    const handleDone = async () => {
        if(!formData.isAbove18){
            alert("You must confirm you are above 18 to proceed");
            return;
        }

        if (formData.email == "" || formData.password == "") {
            alert("Please enter a valid email and password")
            return;
        }
        try {
            const response = await fetch(`${baseUrl}/user/register`, {
                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
            });
            if (!response.ok){
                alert("Registration failed! Please try again");
                throw new Error(("Registration failed! Please try again"))
            }
            alert("Registration successful! Redirecting to set password...")
            router.push("/set-password")
        } catch(error) {
            console.log("Error during registration: ", error);
            alert("Registration failed please try again");
        }
    };


    return (
        <div className={styles.background}>
        <div className={styles.container}>
            <h1 className={styles.heading}>Register</h1>
            <form>
                <div className={styles.inputField}>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@gmail.com"/>
                </div>
                <div className={styles.inputField}>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password"/>
                </div>
                <div className={styles.inputField}>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender:</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className={styles.inputField}>
                    <label>
                        <input
                            type="radio"
                            name="isAbove18"
                            checked={formData.isAbove18}
                            onChange={handleChange}
                            />
                        I confirm that I am above 18
                    </label>
                </div>

                <button type="button" onClick={handleDone} className={styles.submitButton}>
                    Done
                </button>
            </form>
        </div>
        </div>
    );
};

export default Register;
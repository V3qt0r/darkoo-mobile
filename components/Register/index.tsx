import React, {useState } from "react";
import { useRouter } from "next/router";
import styles from "./Register.module.scss";
import { FaUserCircle } from 'react-icons/fa';


const Register: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        userName: "",
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
        if (!formData.isAbove18) {
            alert("You must confirm you are above 18 to proceed");
            return;
        }
    
        if (!formData.email || !formData.password) {
            alert("Please enter a valid email and password");
            return;
        }
        try{
            localStorage.setItem("registerData", JSON.stringify(formData));
            router.push("/confirm-password")
        } catch (error) {
            console.error("Error saving user details: ", error)
            return
        }
    };

    return (
        <div className={styles.background}>
        <div className={styles.container}>
        <FaUserCircle className={styles.icon} />
            <h1 className={styles.heading}>Register</h1>
            <form>
                <div className={styles.inputField}>
                    <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="User Name"/>
                </div>
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






import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss"
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from "next/router";
import { GiLion, GiTigerHead, GiElephant, GiFox, GiWolfHead } from 'react-icons/gi';

const Navbar: React.FC = () => {
    const [dropDownVisible, setDropDownVisible] = useState(false);
        const [userName, setUserName] = useState<string>("");
        const baseUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL;
        const router = useRouter()
        const [image, setImage] = useState(0);
    
        const toggleDropDown = () => {
            setDropDownVisible(!dropDownVisible);
        };
    
        useEffect(() => {
            const fetchUserName = async () => {
                try {
                    const response = await fetch(`${baseUrl}/users/self`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
    
                    if (!response.ok) {
                        throw new Error("Failed to fetch user data");
                    }
    
                    const data = await response.json();
                    console.log(data.details)
                    console.log(data.details.image)
                    setImage(data.details.image)
                    setUserName(data.details.userName); // Assuming the API response contains a 'userName' field
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUserName("Guest"); // Fallback for error case
                }
            };
    
            fetchUserName();
        }, []);

        const goToProfile = () => {
            router.push('/profile'); // Navigate to the profile page
            setDropDownVisible(false); // Close the dropdown after click
        };

        const icons = [
            <FaUserCircle className={styles.icon} />,
            <GiLion className={styles.icon} />,
            <GiTigerHead className={styles.icon} />,
            <GiElephant className={styles.icon} />,
            <GiFox className={styles.icon} />,
            <GiWolfHead className={styles.icon} />
        ];

        const display = () => {
            if (image === 1) {
                return icons[0]
            } else if (image === 2){ 
                return icons[1]
            } else if (image === 3) {
                return icons[2]
            } else if (image === 4) {
                return icons[3]
            } else if (image === 5) {
                return icons[4]
            } else if (image === 6) {
                return icons[5]
            } else {
                return <FaUserCircle className={styles.icon}  />
            }
        } 

    return (
        <header className={styles.header}>
                <div className={styles.iconContainer}>
                    <span onClick={toggleDropDown}>{display()}</span>
                    <span className={styles.userName}>{userName}</span> {/* Display username */}
                    {dropDownVisible && (
                        <div className={styles.dropdown}>
                            <ul>
                                <li onClick={goToProfile}>Profile</li>
                                <li>Groups</li>
                                <li>Settings</li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
    );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import styles from "./Profile.module.scss";
import { FaUserCircle } from 'react-icons/fa';
import { GiLion, GiTigerHead, GiElephant, GiFox, GiWolfHead } from 'react-icons/gi';
import Navbar from '../Navbar';

const Profile: React.FC = () => {
    const [ userName, setUserName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ imageNum, setImageNum ] = useState(0);
    const [ selectedIcon, setSelectedIcon] = useState(<FaUserCircle className={styles.icon} />);
    const baseUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL;


    useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`${baseUrl}/users/self`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                    }); // Replace with your actual API endpoint
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const data = await response.json();
                    console.log(data);
                    setUserName(data.userName);
                    setEmail(data.email);
                    setImageNum(data.details.image);
                    updateSelectedIcon(data.details.image);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
    
            fetchUserData();
        }, []);


        const handleUpdateProfile = async () => {
            try {
                const response = await fetch(`${baseUrl}/users/self`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ userName, email }),
                });
        
                if (!response.ok) {
                    throw new Error('Failed to update profile');
                }
        
                const data = await response.json();
                setUserName(data.userName);
                setEmail(data.email);
                alert('Profile updated successfully!');
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        };


        const updateSelectedIcon = (num: number) => {
            const icons = [
                <FaUserCircle className={styles.icon} />,
                <GiLion className={styles.icon} />,
                <GiTigerHead className={styles.icon} />,
                <GiElephant className={styles.icon} />,
                <GiFox className={styles.icon} />,
                <GiWolfHead className={styles.icon} />
            ];
        
            // Ensure that the number passed corresponds to a valid icon
            setSelectedIcon(icons[num - 1] || <FaUserCircle className={styles.icon} />);
        };
        
        const handleIconClick = async (num: number) => {
            if (num < 1 || num > 6) {
                alert("Invalid icon number")
                console.error("Invalid icon number");
                return; // Early return to avoid invalid data
            }
        
            try {
                const response = await fetch(`${baseUrl}/users/image-num`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ num: num }),
                });
        
                if (!response.ok) {
                    throw new Error('Failed to update image number');
                }
        
                const data = await response.json();
                console.log("Image number updated: ", data);
        
                // Update the local state with the new image number and selected icon
                setImageNum(num);
                updateSelectedIcon(num);
        
                alert('Profile updated successfully!');
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        };
        

        return (
            <div className={styles.profilePage}>
                <div className={styles.navbar}>
                    <Navbar />
                </div>
            <div className={styles.card}>
                <div className={styles.iconContainer}>{selectedIcon}</div>
                <h2>Edit Profile</h2>
                <div className={styles.formGroup}>
                    <input
                        className={styles.input}
                        placeholder='User Name'
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <input
                        className={styles.input}
                        placeholder='example@gmail.com'
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button className={styles.updateButton} onClick={handleUpdateProfile}>
                    Update
                </button>

                <div className={styles.iconSelection}>
                    <h3>Choose Your Profile Icon:</h3>
                    <div className={styles.iconList}>
                        <FaUserCircle className={styles.animalIcon} onClick={() => handleIconClick(1)} />
                        <GiLion className={styles.animalIcon} onClick={() => handleIconClick(2)} />
                        <GiTigerHead className={styles.animalIcon} onClick={() => handleIconClick(3)} />
                        <GiElephant className={styles.animalIcon} onClick={() => handleIconClick(4)} />
                        <GiFox className={styles.animalIcon} onClick={() => handleIconClick(5)} />
                        <GiWolfHead className={styles.animalIcon} onClick={() => handleIconClick(6)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

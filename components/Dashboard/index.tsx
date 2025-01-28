import React, { useState, useEffect } from 'react';
import styles from "./Dashboard.module.scss";
import Navbar from "../Navbar";

const Dashboard: React.FC = () => {

    return (
        <div className={styles.dashboard}>
            <Navbar />
            <main className={styles.mainContent}>
                <h1>Welcome to Darkoo</h1>
            </main>
        </div>
    );
};

export default Dashboard;

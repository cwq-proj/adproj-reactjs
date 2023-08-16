import React from 'react'
import HealthRecordTable from '../components/HealthRecordTable';
import SensitiveInfoTable from '../components/SensitiveInfoTable';
import UserTable from '../components/UserTable';
import StaffTable from '../components/StaffTable';
import { Route, Routes, Link } from 'react-router-dom';

function AllRecordsDashboard({parentURL}) {
    
    return (
        // Links to different parts of the dashboard
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="users">User Table</Link>
                    </li>
                    <li>
                        <Link to="info">Sensitive Information</Link>
                    </li>
                    <li>
                        <Link to="records">Health Records</Link>
                    </li>
                    <li>
                        <Link to="staff">Staff Records</Link>
                    </li>
                    <Routes>
                        <Route path="users" element={<UserTable />} />
                        <Route path="info" element={<SensitiveInfoTable />} />
                        <Route path="records" element={<HealthRecordTable />} />
                        <Route path="staff" element={<StaffTable/>}/>
                    </Routes>
                </ul>
            </nav>
        </>
    )
}

export default AllRecordsDashboard
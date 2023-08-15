import ResponsiveAppBar from "./components/ResponsiveAppBar";
import AllRecordsDashboard from "./staff/dashboard/AllRecordsDashboard";
import { Link, Route, Routes } from "react-router-dom";
import LinkHealthRecord from "./user/dashboard/LinkHealthRecord";
import TestComponent from "./components/TestComponent";
import StaffDashBoardMain from "./staff/dashboard/StaffDashBoardMain";
import LayoutUser from "./user/components/LayoutUser";
import LayoutStaff from "./staff/components/LayoutStaff";
import SensitiveInfoTable from "./staff/components/SensitiveInfoTable";
import UserTable from "./staff/components/UserTable";
import HealthRecordTable from "./staff/components/HealthRecordTable";
import CreateStaff from "./staff/components/CreateStaff";
import UpdateStaff from "./staff/components/UpdateStaff";
import PredictDisease from "./user/components/PredictDisease";
import Login from "./login/components/Login";
import ForgetPassword from "./login/components/ForgetPassword";
import CreateHealthRecords from "./staff/components/CreateHealthRecords";
import UpdateSensitiveInfo from "./staff/components/UpdateSensitiveInfo";
import UpdateHealthRecords from "./staff/components/UpdateHealthRecords";
import UpdateUserDetails from "./user/components/UpdateUserDetails";
import NotFoundPage from "./components/NotFoundPage";
import StaffTable from "./staff/components/StaffTable";
import PredictResult from "./user/components/PredictResult";
import Register from "./login/components/Register";

function App() {
  // in the url need to add in a /dashboard
  const parentURL = "/dashboard/*";

  return (
    // <div className="App">
    //   <main>
    //     <ResponsiveAppBar />
    // <>
    // Uncomment individual to test
    // <StaffDashBoardMain />
    // <LinkHealthRecord />

    // To test this below uncomment from this point
    // Use this url: http://localhost:3000/dashboard
    // <Routes>
    //   <Route path={parentURL} element={<AllRecordsDashboard setOwner={parentURL}/>} />
    // </Routes>
    // To test the above uncomment until this point

    // <MaintainModel/>

    // this is to test reactive api call do not use
    // <TestComponent />
    //     </>
    //   </main>
    // </div>

    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login/forgetpassword" element={<ForgetPassword />}></Route>

      <Route path="/*" element={<NotFoundPage/>} />

      <Route path="/staff" element={<LayoutStaff />}>
        <Route index element={<StaffDashBoardMain />} />

        <Route path="accounts" element={<StaffTable/>} />
        <Route path="accounts/update/:id" element={<UpdateStaff />} />
        <Route path="accounts/create" element={<CreateStaff />} />

        <Route path="records" element={<HealthRecordTable />} />
        <Route path="records/create" element={<CreateHealthRecords />} />
        <Route path="records/update/:id" element={<UpdateHealthRecords />} />

        <Route path="patients" element={<SensitiveInfoTable />} />
        <Route path="patients/update/:id" element={<UpdateSensitiveInfo />} />

        <Route path="users" element={<UserTable />} />

        {/* <Route path="account" element={<UpdateUserDetails />} /> */}
        
      </Route>
      <Route path="/user" element={<LayoutUser />}>
        <Route index element={<LinkHealthRecord />} />
        <Route path="predict" element={<PredictDisease />} />
        <Route path="predict/:data" element={<PredictResult />} />
        <Route path="account" element={<UpdateUserDetails />} />
      </Route>
    </Routes>
  );
}

export default App;

import ResponsiveAppBar from './components/ResponsiveAppBar';
import AllRecordsDashboard from './staff/dashboard/AllRecordsDashboard';
import { Link, Route, Routes } from 'react-router-dom';
import LinkHealthRecord from './user/dashboard/LinkHealthRecord';
import TestComponent from './components/TestComponent';
import StaffDashBoardMain from './staff/dashboard/StaffDashBoardMain';
import MaintainModel from './staff/dashboard/MaintainModel';

function App() {
  // in the url need to add in a /dashboard
  const parentURL = "/dashboard/*";

  return (
    <div className="App">
      <main>
        <ResponsiveAppBar />
        <>
          {/* Uncomment individual to test */}
          {/* <StaffDashBoardMain /> */}
          {/* <LinkHealthRecord /> */}

          {/* To test this below uncomment from this point  */}
          {/* Use this url: http://localhost:3000/dashboard */}
          {/* <Routes>
            <Route path={parentURL} element={<AllRecordsDashboard setOwner={parentURL}/>} />
          </Routes> */}
          {/* To test the above uncomment until this point  */}

          <MaintainModel/>

          {/* this is to test reactive api call do not use */}
          {/* <TestComponent /> */}
        </>
      </main>
    </div>
  );
}

export default App;

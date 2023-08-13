import { Grid, Paper } from "@mui/material";
import ContinuousVariablesCard from "../components/ContinuousVariablesCard";
import { SplitApplicationCacheToJson } from "../util/SplitApplicationCacheToJson";
import BinaryClassificationPlotCard from "../components/BinaryClassificationPlotCard";

function StaffDashBoardHealthRecordCards({ applicationCache }) {
    const { maleJson, tenYearCHDJson, ageJson } = SplitApplicationCacheToJson(applicationCache);

    function ContinuousGraph({ jsonObj }) {
        return (
            <>
                <ContinuousVariablesCard jsonObj={jsonObj} />
            </>
        );
    }

    function BinaryGraph({ jsonObj }) {
        return (
            <>
                <BinaryClassificationPlotCard jsonObj={jsonObj} />
            </>
        );
    }

    return (
        <>
            <Grid item xs={12} md={6} lg={6}>
                <Paper>
                    <ContinuousGraph jsonObj={ageJson} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Paper>
                    <BinaryGraph jsonObj={maleJson} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Paper>
                    <BinaryGraph jsonObj={tenYearCHDJson} />
                </Paper>
            </Grid>
        </>
    );
}

export default StaffDashBoardHealthRecordCards;
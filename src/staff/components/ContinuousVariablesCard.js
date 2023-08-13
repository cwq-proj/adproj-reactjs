import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ContinuousVariables from './ContinuousVariables';

function NormalDistCard({ jsonObj }) {
    const {title, xdata, ycount} = jsonObj;

    return (
        <>
            <Card>
                <CardHeader
                    title={title}
                />
                <CardContent>
                    <ContinuousVariables title={title} xdata={xdata} ycount={ycount} />
                </CardContent>
            </Card>
        </>
    );
}

export default NormalDistCard;
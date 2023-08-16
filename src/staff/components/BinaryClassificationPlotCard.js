import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import BinaryClassificationPlot from './BinaryClassificationPlot'

function BinaryClassificationPlotCard({ jsonObj }) {
    const {title, trueLabel, falseLabel, trueLabelCount, falseLabelCount} = jsonObj;

    return (
        <>
            <Card>
                <CardHeader
                    title={title}
                />
                <CardContent>
                    <BinaryClassificationPlot title={title} trueLabel={trueLabel} falseLabel={falseLabel} trueLabelCount={trueLabelCount} falseLabelCount={falseLabelCount} />
                </CardContent>
            </Card>
        </>
    );
}

export default BinaryClassificationPlotCard;
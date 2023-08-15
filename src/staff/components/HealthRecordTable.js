import ShowAllTableSSE from "./ShowAllTableSSE";
import FetchEventSourceConfig from '../../api/FetchEventSourceConfig';

function HealthRecordTable() {
    // update the variables
    const tableName = "All Health Records";
    const redirectLink = "http://localhost:3000/records/update"
    const subUrl = "dashboard/health-records";
    
    const { data, isLoading } = FetchEventSourceConfig(subUrl);

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            footer: 'ID',
        },
        {
            header: 'Male',
            accessorKey: 'male',
            footer: 'Male',
        },
        {
            header: 'Age',
            accessorKey: 'age',
            footer: 'Age',
        },
        {
            header: 'Education',
            accessorKey: 'education',
            footer: 'Education',
        },
        {
            header: 'Smoker',
            accessorKey: 'currentSmoker',
            footer: 'Smoker',
        },
        {
            header: 'cigsPerDay',
            accessorKey: 'cigsPerDay',
            footer: 'cigsPerDay',
        },
        {
            header: 'BPMeds',
            accessorKey: 'BPMeds',
            footer: 'BPMeds',
        },
        {
            header: 'Prevalent Stroke',
            accessorKey: 'prevalentStroke',
            footer: 'Prevalent Stroke',
        },
        {
            header: 'Prevalent Hypertension',
            accessorKey: 'prevalentHyp',
            footer: 'Prevalent Hypertension',
        },
        {
            header: 'Diabetes',
            accessorKey: 'diabetes',
            footer: 'Diabetes',
        },
        {
            header: 'Total Cholesterol',
            accessorKey: 'totChol',
            footer: 'Total Cholesterol',
        },
        {
            header: 'Systolic BP',
            accessorKey: 'sysBP',
            footer: 'Systolic BP',
        },
        {
            header: 'Diastolic BP',
            accessorKey: 'diaBP',
            footer: 'Diastolic BP',
        },
        {
            header: 'BMI',
            accessorKey: 'BMI',
            footer: 'BMI',
        },
        {
            header: 'Heart Rate',
            accessorKey: 'heartRate',
            footer: 'Heart Rate',
        },
        {
            header: 'Glucose',
            accessorKey: 'glucose',
            footer: 'Glucose',
        },
        {
            header: 'Ten Year CHD',
            accessorKey: 'tenYearCHD',
            footer: 'Ten Year CHD',
        }
    ]

    return (
        <>
            <ShowAllTableSSE isLoading={isLoading} redirectLink={redirectLink} tableName={tableName} data={data} columns={columns} />
        </>
    );
}

export default HealthRecordTable;
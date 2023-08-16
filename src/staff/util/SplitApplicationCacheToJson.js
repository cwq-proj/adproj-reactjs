export function SplitApplicationCacheToJson(applicationCache) {
    const maleJson = {
        title: "male",
        trueLabel: "Male",
        falseLabel: "Female",
        trueLabelCount: applicationCache.healthRecordCacheDTO.male.trueLabelCount,
        falseLabelCount: applicationCache.healthRecordCacheDTO.male.falseLabelCount
    };

    const tenYearCHDJson = {
        title: "tenYearCHD",
        trueLabel: "Has Heart Disease",
        falseLabel: "No Heart Disease",
        trueLabelCount: applicationCache.healthRecordCacheDTO.tenYearCHD.trueLabelCount,
        falseLabelCount: applicationCache.healthRecordCacheDTO.tenYearCHD.falseLabelCount
    };

    const currentSmokerJson = {
        title: "currentSmoker",
        trueLabel: "Smoker",
        falseLabel: "Non Smoker",
        trueLabelCount: applicationCache.healthRecordCacheDTO.currentSmoker.trueLabelCount,
        falseLabelCount: applicationCache.healthRecordCacheDTO.currentSmoker.falseLabelCount
    };

    const ageJson = {
        title: "age",
        xdata: applicationCache.healthRecordCacheDTO.age.xdata.map(value => parseFloat(value.toFixed(2))),
        ycount: applicationCache.healthRecordCacheDTO.age.ycount
        
    };

    return {
        maleJson,
        currentSmokerJson,
        tenYearCHDJson,
        ageJson
    };
}

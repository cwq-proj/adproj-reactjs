export function SplitApplicationCacheToJson(applicationCache) {
    const maleJson = {
        title: "male",
        trueLabelCount: applicationCache.healthRecordCacheDTO.male.trueLabelCount,
        falseLabelCount: applicationCache.healthRecordCacheDTO.male.falseLabelCount
    };

    const tenYearCHDJson = {
        title: "tenYearCHD",
        trueLabelCount: applicationCache.healthRecordCacheDTO.tenYearCHD.trueLabelCount,
        falseLabelCount: applicationCache.healthRecordCacheDTO.tenYearCHD.falseLabelCount
    };

    const ageJson = {
        title: "age",
        xdata: applicationCache.healthRecordCacheDTO.age.xdata.map(value => parseFloat(value.toFixed(2))),
        ycount: applicationCache.healthRecordCacheDTO.age.ycount
        
    };

    return {
        maleJson,
        tenYearCHDJson,
        ageJson
    };
}

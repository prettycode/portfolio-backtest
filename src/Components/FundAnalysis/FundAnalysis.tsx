import React, { useEffect, useState } from 'react';
import { getFundAnalysis } from '../../Fund/transformers/FundAnalysis/getFundAnalysis';
import { FundAnalysis } from '../../Fund/models/FundAnalysis/FundAnalysis';
import { FundAllocation } from '../../Fund/models/Fund/FundAllocation';

interface FundAnalysisProps {
    fundAllocations: Array<FundAllocation>;
}

const FundAnalysis: React.FC<FundAnalysisProps> = ({ fundAllocations }) => {
    const [fundAnalysis, setFundAnalysis] = useState<FundAnalysis | undefined>();

    useEffect(() => {
        (async () => setFundAnalysis(await getFundAnalysis(fundAllocations)))();
    }, []);

    return <>{fundAnalysis && JSON.stringify(fundAnalysis)}</>;
};

export default FundAnalysis;

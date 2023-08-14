import { Fund } from '../models/Fund';

export const calcLeverage = (fund: Fund): number => {
    const { holdings } = fund;

    if (!holdings?.length) {
        throw new Error('Fund is missing holdings. Cannot calculate leveraged.');
    }

    const totalPercentage = holdings.reduce((sum, holding) => sum + holding.percentage, 0);

    if (totalPercentage !== 100) {
        throw new Error('Holdings must add up to 100.');
    }

    const totalPercentageSansBarrowing = holdings.reduce((sum, holding) => sum + (holding.percentage < 0 ? 0 : holding.percentage), 0);

    if (totalPercentageSansBarrowing < 100) {
        throw new Error('Holdings must add up to 100 or more when negative-percentage holdings are removed.');
    }

    return totalPercentageSansBarrowing / 100;
};

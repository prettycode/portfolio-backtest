import { Fund } from '../models/Fund/Fund';

let mock: Array<Fund> | undefined;

export const fetchCustomFunds = async (): Promise<Array<Fund>> =>
    Promise.resolve(
        mock || [
            {
                fundId: 'US Defensive',
                name: 'Equity: US: Defensive',
                description: '33/33/33 XLU/XLP/XLV',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'XLU',
                        percentage: 33.4
                    },
                    {
                        fundId: 'XLP',
                        percentage: 33.3
                    },
                    {
                        fundId: 'XLV',
                        percentage: 33.3
                    }
                ]
            },
            {
                fundId: 'VT',
                name: 'Equity: Global (All-World)',
                description: '60/40 US/Ex-US + 2/3 Int’l. Developed, 1/3 EM',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'VTI',
                        percentage: 60
                    },
                    {
                        fundId: 'VEA',
                        percentage: 26.6
                    },
                    {
                        fundId: 'VWO',
                        percentage: 13.4
                    }
                ]
            },
            {
                fundId: 'NTSX',
                name: 'NTSX (Simulated)',
                description: '90/60 SPY/VGIT',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'SPY',
                        percentage: 90
                    },
                    {
                        fundId: 'VGIT',
                        percentage: 60
                    },
                    {
                        fundId: 'USFR',
                        percentage: -50
                    }
                ]
            },
            {
                fundId: 'GDE',
                name: 'GDE (Simulated)',
                description: '90/90 SPY/GLD',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'SPY',
                        percentage: 90
                    },
                    {
                        fundId: 'GLD',
                        percentage: 90
                    },
                    {
                        fundId: 'USFR',
                        percentage: -80
                    }
                ]
            },
            {
                fundId: 'NTSI',
                name: 'NTSI (Simulated)',
                description: '90/60 VEA/VGIT',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'VEA',
                        percentage: 90
                    },
                    {
                        fundId: 'VGIT',
                        percentage: 60
                    },
                    {
                        fundId: 'USFR',
                        percentage: -50
                    }
                ]
            },
            {
                fundId: 'NTSE',
                name: 'NTSE (Simulated)',
                description: '90/60 VWO/VGIT',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'VWO',
                        percentage: 90
                    },
                    {
                        fundId: 'VGIT',
                        percentage: 60
                    },
                    {
                        fundId: 'USFR',
                        percentage: -50
                    }
                ]
            },
            {
                fundId: 'Global Efficient Core',
                name: 'Global Efficient Core',
                description: '60/20/20 NTSX/NTSI/NTSE (Simulated)',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'NTSX',
                        percentage: 60
                    },
                    {
                        fundId: 'NTSI',
                        percentage: 20
                    },
                    {
                        fundId: 'NTSE',
                        percentage: 20
                    }
                ]
            },
            {
                fundId: 'Global Equities',
                name: 'Global Equities',
                description: '60/20/20 VTI/VEA/VWO',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'VTI',
                        percentage: 60
                    },
                    {
                        fundId: 'VEA',
                        percentage: 20
                    },
                    {
                        fundId: 'VWO',
                        percentage: 20
                    }
                ]
            } /*
            {
                fundId: 'UPAR',
                name: 'UPAR',
                description: 'Should match global equities return',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    { fundId: 'TIPS', percentage: 49 },
                    { fundId: 'Treasuries', percentage: 49 },
                    { fundId: 'Gold', percentage: 14 },
                    { fundId: 'VT', percentage: 35 },
                    { fundId: 'GUNR', percentage: 21 },
                    { fundId: 'USFR', percentage: -68 }
                ]
            },*/,
            {
                fundId: 'SWAN',
                name: 'SWAN (Simulated)',
                description: '70/45/45 SPY/VGLT/VGIT',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'SPY',
                        percentage: 70
                    },
                    {
                        fundId: 'VGIT',
                        percentage: 50
                    },
                    {
                        fundId: 'VGLT',
                        percentage: 40
                    },
                    {
                        fundId: 'USFR',
                        percentage: -60
                    }
                ]
            },
            {
                fundId: 'AOR',
                name: 'Balanced Fund (Global)',
                description: '60/40 Global Equities/Intermediate Treasuries',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'SPY',
                        percentage: 36
                    },
                    {
                        fundId: 'VEA',
                        percentage: 12
                    },
                    {
                        fundId: 'VWO',
                        percentage: 12
                    },
                    {
                        fundId: 'VGIT',
                        percentage: 40
                    }
                ]
            }
        ]
    );

fetchCustomFunds.setMock = (mockCustomFunds: Array<Fund>): void => {
    mock = mockCustomFunds;
};

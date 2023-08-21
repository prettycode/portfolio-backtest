import { Fund } from '../models/Fund/Fund';

let mock: Array<Fund> | undefined;

export const fetchCustomFunds = async (): Promise<Array<Fund>> =>
    Promise.resolve(
        mock || [
            {
                fundId: 'US Defensive',
                name: 'Equity: US: Defensive',
                description: 'XLU/XLP/XLV',
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
                description: '60/40 US/Ex-US + 2/3 Intl. Developed, 1/3 EM',
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
                name: 'GDE (90/0/90 US-only)',
                //description: 'GDE (Simulated)',
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
                name: 'NTSI (90/60 Intl. Developed-only)',
                //description: 'NTSI (Simulated)',
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
                name: 'NTSE (90/60 EM-only)',
                //description: 'NTSE (Simulated)',
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
                fundId: '11',
                name: 'Global Efficient Core',
                //description: '60/20/20 NTSX/NTSI/NTSE (Simulated)',
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
                fundId: '12',
                name: 'Global Gilded Efficient: 30/30/20/20',
                //description: '30/30/20/20 NTSX/GDE/NTSI/NTSE (Simulated)',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'NTSX',
                        percentage: 30
                    },
                    {
                        fundId: 'GDE',
                        percentage: 30
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
                fundId: '13',
                name: 'Global Gilded Efficient: 36/24/20/20',
                //description: '36/24/20/20 NTSX/GDE/NTSI/NTSE (Simulated)',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'NTSX',
                        percentage: 36
                    },
                    {
                        fundId: 'GDE',
                        percentage: 24
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
                fundId: '16',
                name: 'Global Gilded Efficient: 24/36/20/20',
                //description: '24/36/20/20 NTSX/GDE/NTSI/NTSE (Simulated)',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'NTSX',
                        percentage: 24
                    },
                    {
                        fundId: 'GDE',
                        percentage: 36
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
                fundId: '15',
                name: 'Global Equities (60/20/20 US/Intl. Developed/EM)',
                //description: '60/20/20 US/Intl. Developed/EM',
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
                fundId: 'SWAN A',
                name: 'SWAN (70/90 SPY/VGIT)',
                //description: 'SWAN (Simualted)',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'SPY',
                        percentage: 70
                    },
                    {
                        fundId: 'VGIT',
                        percentage: 90
                    },
                    {
                        fundId: 'USFR',
                        percentage: -60
                    }
                ]
            },
            {
                fundId: 'SWAN B',
                name: 'SWAN (70/85 SPY/IEF)',
                //description: 'SWAN (Simualted)',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'SPY',
                        percentage: 70
                    },
                    {
                        fundId: 'IEF',
                        percentage: 85
                    },
                    {
                        fundId: 'USFR',
                        percentage: -55
                    }
                ]
            },
            {
                fundId: 'AOR',
                name: 'Balanced Fund (Global)',
                //description: '60/40 Global Equities/Intermediate Treasuries',
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
            } /*, {
                fundId: 'AOR',
                name: 'UPAR',
                description: 'UPAR (Simualted)',
                percentage: 100,
                type: 'Custom',
                allocations: [
                ]
            }*/
        ]
    );

fetchCustomFunds.setMock = (mockCustomFunds: Array<Fund>): void => {
    mock = mockCustomFunds;
};

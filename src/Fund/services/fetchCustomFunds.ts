import { Fund } from '../models/Fund/Fund';

let mock: Array<Fund> | undefined;

export const fetchCustomFunds = async (): Promise<Array<Fund>> =>
    Promise.resolve(
        mock || [
            {
                fundId: 'CASHX',
                tickerSymbol: 'CASHX',
                name: 'Cash (Money Market)',
                description: undefined,
                marketRegion: 'US',
                assetClass: 'Cash',
                percentage: 100,
                type: 'Index',
                allocations: []
            },
            {
                fundId: '^GOLD',
                name: 'Gold (Index)',
                tickerSymbol: '^GOLD',
                description: undefined,
                marketRegion: 'Global (All-World)',
                assetClass: 'Commodity',
                percentage: 100,
                type: 'Index',
                allocations: []
            },
            {
                fundId: 'Custom:US Defensive',
                name: 'Equity: US: Defensive',
                description: 'Utilities, Consumer Staples, Healthcare',
                marketRegion: 'US',
                assetClass: 'Equity',
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
                fundId: 'Custom:Global (All-World) Defensive',
                name: 'Equity: Global (All-World): Defensive',
                description: 'Utilities, Consumer Staples, Healthcare, and Low-Volatility',
                marketRegion: 'Global (All-World)',
                assetClass: 'Equity',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'VPU',
                        percentage: 26
                    },
                    {
                        fundId: 'IXJ',
                        percentage: 26
                    },
                    {
                        fundId: 'KXI',
                        percentage: 26
                    },
                    {
                        fundId: 'EFAV',
                        percentage: 11
                    },
                    {
                        fundId: 'EEMV',
                        percentage: 11
                    }
                ]
            },
            {
                fundId: 'Custom:VT',
                name: 'Equity: Global (All-World)',
                description: '60/40 US/Ex-US, where Ex-US is 2/3 Int’l. Developed, 1/3 EM',
                marketRegion: 'Global (All-World)',
                assetClass: 'Equity',
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
                fundId: 'Custom:NTSX',
                name: 'NTSX (Simulated)',
                description: '90/60 SPY/VGIT',
                marketRegion: 'US',
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
                        fundId: 'CASHX',
                        percentage: -50
                    }
                ]
            },
            {
                fundId: 'Custom:GDE',
                name: 'GDE (Simulated)',
                description: '90/90 SPY/GLD',
                marketRegion: 'US',
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
                        fundId: 'CASHX',
                        percentage: -80
                    }
                ]
            },
            {
                fundId: 'Custom:NTSX+GDE',
                name: 'US Efficient Core + Gold',
                description: '66.7/33.3 NTSX/GDE (Simulated)',
                marketRegion: 'US',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'Custom:NTSX',
                        percentage: 66.7
                    },
                    {
                        fundId: 'Custom:GDE',
                        percentage: 33.3
                    }
                ]
            },
            {
                fundId: 'Custom:NTSI',
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
                        fundId: 'CASHX',
                        percentage: -50
                    }
                ]
            },
            {
                fundId: 'Custom:NTSE',
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
                        fundId: 'CASHX',
                        percentage: -50
                    }
                ]
            },
            {
                fundId: 'Custom:Global Efficient Core',
                name: 'Global (All-World) Efficient Core',
                description: '60/20/20 NTSX/NTSI/NTSE (Simulated)',
                marketRegion: 'Global (All-World)',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'Custom:NTSX',
                        percentage: 60
                    },
                    {
                        fundId: 'Custom:NTSI',
                        percentage: 20
                    },
                    {
                        fundId: 'Custom:NTSE',
                        percentage: 20
                    }
                ]
            },
            {
                fundId: 'Custom:Global Efficient Core, Gilded',
                name: 'Global (All-World) Efficient Core + Gold',
                description: '60/20/20 NTSX/NTSI/NTSE (Simulated)',
                marketRegion: 'Global (All-World)',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'Custom:GDE',
                        percentage: 33.3
                    },
                    {
                        fundId: 'Custom:NTSX',
                        percentage: 26.7
                    },
                    {
                        fundId: 'Custom:NTSI',
                        percentage: 20
                    },
                    {
                        fundId: 'Custom:NTSE',
                        percentage: 20
                    }
                ]
            },
            {
                fundId: 'Custom:Global Equities',
                name: 'Global (All-World) Equities (3/1/1 US/Developed/EM)',
                description: '60/20/20 VTI/VEA/VWO',
                marketRegion: 'Global (All-World)',
                assetClass: 'Equity',
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
            },
            {
                fundId: 'Custom:SWAN',
                name: 'SWAN (Simulated)',
                description: '70/45/45 SPY/VGLT/VGIT',
                marketRegion: 'US',
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
                        fundId: 'CASHX',
                        percentage: -60
                    }
                ]
            },
            {
                fundId: 'Custom:AOR',
                name: 'Global (All-World) Balanced Fund',
                description: '60/40 Global Equities/Intermediate Treasuries',
                marketRegion: 'Global (All-World)',
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
            },
            {
                fundId: 'Custom:Small Cap Value',
                name: 'Global (All-World) Small-Cap Value',
                description: '60/20/20 AVUV/AVDV/DGS',
                marketRegion: 'Global (All-World)',
                assetClass: 'Equity',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    {
                        fundId: 'AVUV',
                        percentage: 60
                    },
                    {
                        fundId: 'AVDV',
                        percentage: 20
                    },
                    {
                        fundId: 'DGS',
                        percentage: 20
                    }
                ]
            } /*,
            {
                fundId: 'Custom:UPAR',
                name: 'UPAR',
                description: 'Should match global equities return',
                percentage: 100,
                type: 'Custom',
                allocations: [
                    { fundId: 'TIPS', percentage: 49 },
                    { fundId: 'Treasuries', percentage: 49 },
                    { fundId: 'Gold', percentage: 14 },
                    { fundId: 'Custom:VT', percentage: 35 },
                    { fundId: 'GUNR', percentage: 21 },
                    { fundId: 'CASHX', percentage: -68 }
                ]
            },*/
        ]
    );

fetchCustomFunds.setMock = (mockCustomFunds: Array<Fund>): void => {
    mock = mockCustomFunds;
};

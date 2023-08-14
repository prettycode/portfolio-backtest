import { Fund } from '../models/Fund/Fund';

export const fetchCustomFunds = async (): Promise<Array<Fund>> =>
    Promise.resolve([
        {
            fundId: 7,
            name: 'NTSX (90/60 US-only)',
            description: 'Placeholder Description for NTSX',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    fundId: 1,
                    percentage: 90
                },
                {
                    fundId: 2,
                    percentage: 60
                },
                {
                    fundId: 4,
                    percentage: -50
                }
            ]
        },
        {
            fundId: 8,
            name: 'GDE (90/0/90 US-only)',
            description: 'Placeholder Description for GDE',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    fundId: 1,
                    percentage: 90
                },
                {
                    fundId: 3,
                    percentage: 90
                },
                {
                    fundId: 4,
                    percentage: -80
                }
            ]
        },
        {
            fundId: 9,
            name: 'NTSI (90/60 Intl. Developed-only)',
            description: 'Placeholder Description for NTSI',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    fundId: 5,
                    percentage: 90
                },
                {
                    fundId: 2,
                    percentage: 60
                },
                {
                    fundId: 4,
                    percentage: -50
                }
            ]
        },
        {
            fundId: 10,
            name: 'NTSE (90/60 EM-only)',
            description: 'Placeholder Description for NTSE',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    fundId: 6,
                    percentage: 90
                },
                {
                    fundId: 2,
                    percentage: 60
                },
                {
                    fundId: 4,
                    percentage: -50
                }
            ]
        },
        {
            fundId: 11,
            name: 'Global Efficient Core (60/20/20 NTSX/NTSI/NTSE)',
            description: 'Placeholder Description for Global Efficient Core',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    fundId: 7,
                    percentage: 60
                },
                {
                    fundId: 9,
                    percentage: 20
                },
                {
                    fundId: 10,
                    percentage: 20
                }
            ]
        },
        {
            fundId: 12,
            name: 'Global + Gold Efficient Core (30/30/20/20 NTSX/GDE/NTSI/NTSE)',
            description: 'Placeholder Description for Global + Gold Efficient Core',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    fundId: 7,
                    percentage: 30
                },
                {
                    fundId: 8,
                    percentage: 30
                },
                {
                    fundId: 9,
                    percentage: 20
                },
                {
                    fundId: 10,
                    percentage: 20
                }
            ]
        },
        {
            fundId: 13,
            name: 'Global + Gold Efficient Core (36/24/20/20 NTSX/GDE/NTSI/NTSE)',
            description: 'Placeholder Description for Global + Gold Efficient Core',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    fundId: 7,
                    percentage: 36
                },
                {
                    fundId: 8,
                    percentage: 24
                },
                {
                    fundId: 9,
                    percentage: 20
                },
                {
                    fundId: 10,
                    percentage: 20
                }
            ]
        },
        {
            fundId: 15,
            name: 'Global Equities (60/20/20)',
            description: '',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    fundId: 14,
                    percentage: 60
                },
                {
                    fundId: 5,
                    percentage: 20
                },
                {
                    fundId: 6,
                    percentage: 20
                }
            ]
        }
    ]);

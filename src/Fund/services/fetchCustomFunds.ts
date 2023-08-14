import { Fund } from '../models/Fund/Fund';

export const fetchCustomFunds = async (): Promise<Array<Fund>> =>
    Promise.resolve([
        {
            id: 7,
            name: 'NTSX (90/60 US-only)',
            description: 'Placeholder Description for NTSX',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    id: 1,
                    percentage: 90
                },
                {
                    id: 2,
                    percentage: 60
                },
                {
                    id: 4,
                    percentage: -50
                }
            ]
        },
        {
            id: 8,
            name: 'GDE (90/0/90 US-only)',
            description: 'Placeholder Description for GDE',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    id: 1,
                    percentage: 90
                },
                {
                    id: 3,
                    percentage: 90
                },
                {
                    id: 4,
                    percentage: -80
                }
            ]
        },
        {
            id: 9,
            name: 'NTSI (90/60 Intl. Developed-only)',
            description: 'Placeholder Description for NTSI',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    id: 5,
                    percentage: 90
                },
                {
                    id: 2,
                    percentage: 60
                },
                {
                    id: 4,
                    percentage: -50
                }
            ]
        },
        {
            id: 10,
            name: 'NTSE (90/60 EM-only)',
            description: 'Placeholder Description for NTSE',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    id: 6,
                    percentage: 90
                },
                {
                    id: 2,
                    percentage: 60
                },
                {
                    id: 4,
                    percentage: -50
                }
            ]
        },
        {
            id: 11,
            name: 'Global Efficient Core (60/20/20 NTSX/NTSI/NTSE)',
            description: 'Placeholder Description for Global Efficient Core',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    id: 7,
                    percentage: 60
                },
                {
                    id: 9,
                    percentage: 20
                },
                {
                    id: 10,
                    percentage: 20
                }
            ]
        },
        {
            id: 12,
            name: 'Global + Gold Efficient Core (30/30/20/20 NTSX/GDE/NTSI/NTSE)',
            description: 'Placeholder Description for Global + Gold Efficient Core',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    id: 7,
                    percentage: 30
                },
                {
                    id: 8,
                    percentage: 30
                },
                {
                    id: 9,
                    percentage: 20
                },
                {
                    id: 10,
                    percentage: 20
                }
            ]
        },
        {
            id: 13,
            name: 'Global + Gold Efficient Core (36/24/20/20 NTSX/GDE/NTSI/NTSE)',
            description: 'Placeholder Description for Global + Gold Efficient Core',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    id: 7,
                    percentage: 36
                },
                {
                    id: 8,
                    percentage: 24
                },
                {
                    id: 9,
                    percentage: 20
                },
                {
                    id: 10,
                    percentage: 20
                }
            ]
        },
        {
            id: 15,
            name: 'Global Equities (60/20/20)',
            description: '',
            percentage: 100,
            type: 'Custom',
            holdings: [
                {
                    id: 14,
                    percentage: 60
                },
                {
                    id: 5,
                    percentage: 20
                },
                {
                    id: 6,
                    percentage: 20
                }
            ]
        }
    ]);

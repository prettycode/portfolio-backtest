import { Fund } from '../models/Fund/Fund';

let mock: Array<Fund> | undefined;

export const fetchCustomFunds = async (): Promise<Array<Fund>> =>
    Promise.resolve(
        mock || [
            {
                fundId: 7,
                name: 'NTSX (90/60 US-only)',
                description: 'NTSX (Simulated)',
                percentage: 100,
                type: 'Custom',
                allocations: [
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
                description: 'GDE (Simulated)',
                percentage: 100,
                type: 'Custom',
                allocations: [
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
                description: 'NTSI (Simulated)',
                percentage: 100,
                type: 'Custom',
                allocations: [
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
                description: 'NTSE (Simulated)',
                percentage: 100,
                type: 'Custom',
                allocations: [
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
                name: 'Global Efficient Core',
                description: '60/20/20 NTSX/NTSI/NTSE (Simulated)',
                percentage: 100,
                type: 'Custom',
                allocations: [
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
                name: 'Global Gilded Efficient Core A',
                description: '30/30/20/20 NTSX/GDE/NTSI/NTSE (Simulated)',
                percentage: 100,
                type: 'Custom',
                allocations: [
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
                name: 'Global Gilded Efficient Core B',
                description: '36/24/20/20 NTSX/GDE/NTSI/NTSE (Simulated)',
                percentage: 100,
                type: 'Custom',
                allocations: [
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
                name: 'Global Equities (60/20/20 US/Intl. Developed/EM)',
                description: '60/20/20 US/Intl. Developed/EM',
                percentage: 100,
                type: 'Custom',
                allocations: [
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
        ]
    );

fetchCustomFunds.setMock = (mockCustomFunds: Array<Fund>): void => {
    mock = mockCustomFunds;
};

/*

type FundType = 'Synthetic' | 'ETF' | 'Company' | 'Index' | 'Mutual Fund';
type FundMarketRegion = 'US' | 'International Developed' | 'Emerging' | 'Ex-US' | 'Global (All-World)';
type FundAssetClass = 'Equity' | 'Treasury' | 'Bond' | 'Commodity' | 'Cash';

type Fund = {
	id: number;
	name?: string;
	description?: string;
	tickerSymbol?: string;
	percentage: number;
	type: FundType;
	marketRegion: FundMarketRegion,
	assetClass: FundAssetClass,
	holdings?: Fund[];
}*/

const marketFunds/*: Fund[]*/ = [
	{
		id: 1,
		name: "VFINX (SPY)",
		description: "Vanguard 500 Index Fund Investor Shares",
		tickerSymbol: "VFINX",
		percentage: 100,
		type: 'Mutual Fund',
		marketRegion: 'US',
		assetClass: 'Equity',
		holdings: []
	},
	{
		id: 2,
		name: "VFITX (VGIT)",
		description: "Vanguard Intermediate-Term Treasury Fund Investor Shares",
		tickerSymbol: "VFITX",
		percentage: 100,
		type: 'Mutual Fund',
		marketRegion: 'US',
		assetClass: 'Treasury',
		holdings: []
	},
	{
		id: 3,
		name: "^GOLD (GLD)",
		description: "Gold",
		tickerSymbol: "^GOLD",
		percentage: 100,
		type: 'Index',
		assetClass: 'Commodity',
		holdings: []
	},
	{
		id: 4,
		name: "CASHX (SGOV)",
		description: "Treasury money market",
		tickerSymbol: "CASHX",
		percentage: 100,
		type: 'ETF',
		assetClass: 'Cash',
		holdings: []
	},
	{
		id: 5,
		name: "DFALX (VEA)",
		description: "DFA Large Cap International Portfolio",
		tickerSymbol: "DFALX",
		percentage: 100,
		type: 'Mutual Fund',
		marketRegion: 'International Developed',
		assetClass: 'Equity',
		holdings: []
	},
	{
		id: 6,
		name: "VEIEX (VWO)",
		description: "Vanguard Emerging Markets Stock Index Fund",
		tickerSymbol: "VEIEX",
		percentage: 100,
		type: 'Mutual Fund',
		marketRegion: 'Emerging',
		assetClass: 'Equity',
		holdings: []
	},
	{
		id: 14,
		name: "VTSMX (VTI)",
		description: "Vanguard Total Stock Market Fund",
		tickerSymbol: "VTSMX",
		percent: 100,
		type: 'Mutual Fund',
		marketRegion: 'US',
		assetClass: 'Equity',
		holdings: []
	}
];

const customPortfolios/*: Fund[]*/ = [
	{
		id: 7,
		name: "NTSX (90/60 US-only)",
		description: "Placeholder Description for NTSX",
		percentage: 100,
		type: 'Synthetic',
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
		name: "GDE (90/0/90 US-only)",
		description: "Placeholder Description for GDE",
		percentage: 100,
		type: 'Synthetic',
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
		name: "NTSI (90/60 Intl. Developed-only)",
		description: "Placeholder Description for NTSI",
		percentage: 100,
		type: 'Synthetic',
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
		name: "NTSE (90/60 EM-only)",
		description: "Placeholder Description for NTSE",
		percentage: 100,
		type: 'Synthetic',
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
		name: "Global Efficient Core (60/20/20 NTSX/NTSI/NTSE)",
		description: "Placeholder Description for Global Efficient Core",
		percentage: 100,
		type: 'Synthetic',
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
		name: "Global + Gold Efficient Core (30/30/20/20 NTSX/GDE/NTSI/NTSE)",
		description: "Placeholder Description for Global + Gold Efficient Core",
		percentage: 100,
		type: 'Synthetic',
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
		name: "Global + Gold Efficient Core (36/24/20/20 NTSX/GDE/NTSI/NTSE)",
		description: "Placeholder Description for Global + Gold Efficient Core",
		percentage: 100,
		type: 'Synthetic',
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
		name: "Global Equities (60/20/20)",
		description: "",
		percentage: 100,
		type: 'Synthetic',
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
];
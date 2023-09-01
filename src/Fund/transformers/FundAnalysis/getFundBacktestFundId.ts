/**
 * Given the ticker symbol of an asset, return the ticker symbol of a similar asset with longer history.
 */
export const getFundBacktestFundId = (tickerSymbol: string): string => {
    switch (tickerSymbol) {
        // US Total market
        case 'VTI':
        case 'ITOT':
        case 'AVUS':
            return 'VTSMX';

        // S&P 500
        case 'VOO':
        case 'SPY':
            return 'VFINX';

        // US Large-Cap Utilities
        case 'VPU':
            return 'XLU';

        // US Large-Cap Consumer Staples
        case 'VDC':
            return 'XLP';

        // US Large-Cap Healthcare
        case 'VHT':
            return 'XLV';

        // US Large-Cap Real Estate
        case 'VNQ':
        case 'IYR':
            return 'VGSIX';

        // Int’l Developed Large Cap
        case 'VEA':
        case 'EFA':
        case 'AVDE':
            return 'DFALX';

        // Emerging Markets
        case 'VWO':
        case 'EEM':
        case 'AVEM':
            return 'VEIEX';

        // US Cash (Money Market)
        case 'USFR':
        case 'SGOV':
        case 'TFLO':
        case 'FLOT':
            return 'CASHX';

        // US Short-Term Treasuries
        case 'VGSH':
        case 'SHV':
            return 'VFISX';

        // US Intermediate-Term Treasuries
        case 'VGIT':
        case 'IEF':
            return 'VFITX';

        // US Long-Term Treasuries
        case 'VGLT':
        case 'TLT':
            return 'VUSTX';

        // US 20 – 30-Year Treasuries STRIPS
        case 'EDV':
        case 'ZROZ':
        case 'GOVZ':
            return 'VEDTX';

        // Gold
        case 'GLD':
        case 'GLDM':
        case 'IAU':
        case 'IAUM':
        case 'SGOL':
        case 'AAAU':
        case 'OUNZ':
        case 'BAR':
            return '^GOLD';

        // US Large-Cap Value
        case 'AVLV':
        case 'DFLV':
            return 'DFLVX';

        // Int’l Developed Large-Cap Value
        case 'AVDV':
        case 'DFIV':
            return 'DFIVX';

        // US Small-Cap Value
        case 'AVUV':
        case 'DFSV':
            return 'DFSVX';

        // Int’l Developed Small-Cap Value
        case 'AVDV':
        case 'DISV':
            return 'DISVX';

        default:
            return tickerSymbol;
    }
};

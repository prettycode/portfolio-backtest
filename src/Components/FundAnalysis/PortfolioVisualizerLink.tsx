import { useEffect, useState } from 'react';
import { getBacktestUrl } from '../../Fund/utils/getBacktestUrl';
import { FundAllocation } from '../../Fund/models/Fund/FundAllocation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { PortfolioVisualizerBadge } from './PortfolioVisualizerBadge';

type PortfolioVisualizerBacktestLinkProps = {
    allocations: Array<FundAllocation>;
};

export const PortfolioVisualizerLink: React.FC<PortfolioVisualizerBacktestLinkProps> = ({ allocations }) => {
    const [url, setUrl] = useState<string | undefined>();

    useEffect(() => {
        (async () => setUrl(await getBacktestUrl(allocations)))();
    });

    return (
        <>
            {url && (
                <span className="float-end" style={{ display: 'inline-block' }}>
                    <PortfolioVisualizerBadge style={{ position: 'relative', top: -1 }} />
                    &nbsp;
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open backtest in Portfolio Visualizer"
                        style={{
                            fontSize: '0.7em'
                        }}
                    >
                        <FontAwesomeIcon icon={faExternalLink} />
                    </a>
                </span>
            )}
        </>
    );
};

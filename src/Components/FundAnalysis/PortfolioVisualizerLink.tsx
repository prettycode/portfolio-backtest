import { useEffect, useState } from 'react';
import { getBacktestUrl } from '../../Fund/utils/getBacktestUrl';
import { FundAllocation } from '../../Fund/models/Fund/FundAllocation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

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
                <span style={{ display: 'inline-block', float: 'right' }}>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open backtest in Portfolio Visualizer"
                        style={{
                            fontSize: '0.6em',
                            position: 'relative',
                            top: '-2px'
                        }}
                    >
                        <FontAwesomeIcon icon={faExternalLink} />
                    </a>
                </span>
            )}
        </>
    );
};

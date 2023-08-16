import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBank, faExternalLink, faOilCan, faQuestion, faSackDollar, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FundAssetClass } from '../../Fund/models/Fund/FundAssetClass';

type FundAssetClassIconProps = {
    assetClass: FundAssetClass | undefined;
};

export const FundAssetClassIcon: React.FC<FundAssetClassIconProps> = ({ assetClass }) => {
    return (
        <>
            {assetClass === 'Bond' && <FontAwesomeIcon icon={faExternalLink} />}
            {assetClass === 'Commodity' && <FontAwesomeIcon icon={faOilCan} />}
            {assetClass === 'Equity' && <FontAwesomeIcon icon={faUserTie} />}
            {assetClass === 'Treasury' && <FontAwesomeIcon icon={faBank} />}
            {assetClass === 'Cash' && <FontAwesomeIcon icon={faSackDollar} />}
            {assetClass === undefined && <FontAwesomeIcon icon={faQuestion} />}
        </>
    );
};

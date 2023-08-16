import Select from 'react-select';
import { Fund } from '../../Fund/models/Fund/Fund';

type OptionType = {
    value: string;
    label: string | undefined;
};

type FundSelectionDropdownProps = {
    funds: Array<Fund>;
};

export const FundSelectionDropdown: React.FC<FundSelectionDropdownProps> = ({ funds }) => {
    const options: OptionType[] = funds.map((fund) => ({
        value: fund.fundId,
        label: fund.name
    }));

    return <Select options={options} />;
};

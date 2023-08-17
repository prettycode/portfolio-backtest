import Select from 'react-select';
import { Fund } from '../../Fund/models/Fund/Fund';

type OptionType = {
    value: string;
    label: string | undefined;
};

type FundSelectionDropdownProps = {
    funds: Array<Fund>;
    onFundSelected: (fundId: string) => void;
};

export const FundSelectionDropdown: React.FC<FundSelectionDropdownProps> = ({ funds, onFundSelected }) => {
    const options: OptionType[] = funds.map((fund) => ({
        value: fund.fundId,
        label: fund.tickerSymbol ? (fund.name ? `${fund.tickerSymbol} (${fund.name})` : fund.tickerSymbol) : fund.name || ''
    }));

    const handleChange = (selectedOption: OptionType | null) => {
        if (selectedOption) {
            onFundSelected(selectedOption.value);
        }
    };

    return (
        <Select options={options} placeholder="Search for asset..." openMenuOnClick={false} isSearchable={true} onChange={handleChange} />
    );
};

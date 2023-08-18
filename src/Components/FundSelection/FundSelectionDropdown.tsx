import Select, { StylesConfig } from 'react-select';
import { Fund } from '../../Fund/models/Fund/Fund';

type OptionType = {
    value: string;
    label: string | undefined;
};

type FundSelectionDropdownProps = {
    funds: Array<Fund>;
    onFundSelected: (fundId: string) => void;
    className?: string | undefined;
};

export const FundSelectionDropdown: React.FC<FundSelectionDropdownProps> = ({ funds, onFundSelected, className }) => {
    const options: OptionType[] = funds
        .map((fund) => ({
            value: fund.fundId,
            label:
                `${fund.fundId}: ` +
                (fund.tickerSymbol ? (fund.name ? `${fund.tickerSymbol} (${fund.name})` : fund.tickerSymbol) : fund.name || '')
        }))
        .sort((a, b) => a.label?.localeCompare(b.label || '') || 0);

    const customStyles: StylesConfig<OptionType, false> = {
        control: (provided) => ({
            ...provided,
            minHeight: 'calc(1.5em + .75rem + 2px)',
            padding: '0',
            fontSize: '.875rem',
            lineHeight: '1.5',
            borderRadius: '.2rem'
        })
    };

    const handleChange = (selectedOption: OptionType | null) => {
        if (selectedOption) {
            onFundSelected(selectedOption.value);
        }
    };

    return (
        <Select
            className={className}
            styles={customStyles}
            isClearable={true}
            options={options}
            placeholder="Search for asset..."
            openMenuOnClick={false}
            isSearchable={true}
            onChange={handleChange}
        />
    );
};

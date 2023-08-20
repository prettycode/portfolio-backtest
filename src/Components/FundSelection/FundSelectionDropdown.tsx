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
    selectedFundId?: string | undefined;
};

export const FundSelectionDropdown: React.FC<FundSelectionDropdownProps> = ({ funds, onFundSelected, className, selectedFundId }) => {
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
            padding: '0',
            fontSize: '.875rem',
            lineHeight: '1.5',
            borderRadius: '.2rem'
        })
    };

    const handleChange = (selectedOption: OptionType | null) => {
        onFundSelected(!selectedOption ? '' /* defaultFundId */ : selectedOption.value);
    };

    return (
        <Select
            className={className}
            styles={customStyles}
            isClearable={true}
            options={options}
            value={selectedFundId ? options.find((option) => option.value === selectedFundId) : undefined}
            placeholder="Search for asset..."
            openMenuOnClick={false}
            isSearchable={true}
            onChange={handleChange}
        />
    );
};

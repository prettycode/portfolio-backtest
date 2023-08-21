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
    isMulti?: boolean | undefined;
};

export const FundSelectionDropdown: React.FC<FundSelectionDropdownProps> = ({
    funds,
    onFundSelected,
    className,
    selectedFundId,
    isMulti
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const optionsDeprecated: OptionType[] = funds
        .map((fund) => ({
            value: fund.fundId,
            label:
                `${fund.fundId}: ` +
                (fund.tickerSymbol ? (fund.name ? `${fund.tickerSymbol} (${fund.name})` : fund.tickerSymbol) : fund.name || '')
        }))
        .sort((a, b) => a.label?.localeCompare(b.label || '') || 0);

    const options: OptionType[] = funds
        .map((fund) => ({
            value: fund.fundId,
            label:
                `${fund.assetClass || fund.type}: ${fund.name || '[no name]'} ${fund.tickerSymbol ? `(${fund.tickerSymbol})` : ''}` +
                (!isMulti ? `${fund.description ? ` [${fund.description}]` : ''}` : '')
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
            isMulti={isMulti as false | undefined}
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

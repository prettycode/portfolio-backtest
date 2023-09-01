import Select, { StylesConfig } from 'react-select';
import { Fund } from '../../Fund/models/Fund/Fund';
import { UNSELECTED_FUND_FUNDID } from '../FundSelectionTable/FundSelectionTable';

export type FundSelectionDropdownOptionType = {
    value: string;
    label: string | undefined;
};

type FundSelectionDropdownProps = {
    funds: Array<Fund>;
    onFundSelected: (fundId: FundSelectionDropdownOptionType | null) => void;
    className?: string | undefined;
    selectedFundId?: string | undefined;
    isMulti?: boolean | undefined;
};

/**
 * `value` attribute value for `<Select>` that will clear it (`undefined` doesn't).
 */
const CLEAR_SELECT_VALUE = null;

export const FundSelectionDropdown: React.FC<FundSelectionDropdownProps> = ({
    funds,
    onFundSelected,
    className,
    selectedFundId,
    isMulti
}) => {
    const options: FundSelectionDropdownOptionType[] = funds
        .map((fund) => ({
            value: fund.fundId,
            label: fund.tickerSymbol
                ? `${fund.assetClass}: ${fund.tickerSymbol} (${fund.name})`
                : `${fund.type}: ${fund.name}`
            /*`${fund.assetClass || fund.type}: ${fund.name || '[no name]'} ${
                fund.tickerSymbol ? `(${fund.tickerSymbol})` : ''
            }`*/
            // Showing description is nice but it makes the matching function on the dropdown too inclusive; disable for now until filtering can be updated to exclude description
            /*`${fund.assetClass || fund.type}: ${fund.name || '[no name]'} ${fund.tickerSymbol ? `(${fund.tickerSymbol})` : ''}` +
                (!isMulti ? `${fund.description ? ` [${fund.description}]` : ''}` : '')*/
        }))
        .sort((a, b) => a.label?.localeCompare(b.label || '') || 0);

    const customStyles: StylesConfig<FundSelectionDropdownOptionType, false> = {
        control: (provided) => ({
            ...provided,
            padding: '0',
            fontSize: '.875rem',
            lineHeight: '1.5',
            borderRadius: '.2rem'
        })
    };

    const handleChange = (selectedOption: FundSelectionDropdownOptionType | null) => {
        onFundSelected(!selectedOption ? null : selectedOption);
    };

    return (
        <Select
            isMulti={isMulti as false | undefined}
            className={className}
            styles={customStyles}
            isClearable={true}
            options={options}
            value={
                selectedFundId !== UNSELECTED_FUND_FUNDID
                    ? options.find(
                          (option) => option.value === selectedFundId
                      ) /* TODO: log warning if find() returns undefined  */ || CLEAR_SELECT_VALUE
                    : CLEAR_SELECT_VALUE
            }
            placeholder={isMulti ? 'Select multiple assets...' : 'Search for asset...'}
            openMenuOnClick={false}
            isSearchable={true}
            onChange={handleChange}
        />
    );
};

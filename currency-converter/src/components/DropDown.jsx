import { HiOutlineStar, HiStar } from "react-icons/hi2";

const CurrencyDropdown = ({
    currencies,
    currency,
    setCurrency,
    favourites,
    handleFavourite,
    title = ""
}) => {

    const isFavourite = (curr) => favourites.includes(curr);

    return (
        <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">{title}</label>

            <div className="mt-1 relative">
                <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full p-2 pr-10 border border-gray-300 rounded-md shadow-sm 
                    bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                    {/* Favourite currencies */}
                    {favourites.map((currency) => (
                        <option className="bg-gray-200" value={currency} key={currency}>
                            {currency}
                        </option>
                    ))}

                    {/* Divider (only visual, not functional) */}
                    <option disabled>──────────</option>

                    {/* Other currencies */}
                    {currencies
                        .filter((c) => !favourites.includes(c))
                        .map((currency) => (
                            <option value={currency} key={currency}>
                                {currency}
                            </option>
                        ))}
                </select>

                {/* Favourite toggle */}
                <button 
                    onClick={() => handleFavourite(currency)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-lg text-yellow-500"
                >
                    {isFavourite(currency) ? <HiStar /> : <HiOutlineStar />}
                </button>
            </div>
        </div>
    );
};

export default CurrencyDropdown;

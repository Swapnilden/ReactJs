import { useEffect, useState } from "react";
import CurrencyDropdown from "./DropDown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConvertor = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [converting, setConverting] = useState(false);
    const [favourites, setFavourites] = useState(
        JSON.parse(localStorage.getItem("favourites")) || ["INR", "EUR"]
    );

    const fetchCurrencies = async () => {
        try {
            const res = await fetch("https://api.frankfurter.app/currencies");
            const data = await res.json();
            setCurrencies(Object.keys(data));
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const convertCurrency = async () => {
        if (!amount) return;
        setConverting(true);

        try {
            const res = await fetch(
                `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
            );
            const data = await res.json();
            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
        } catch (error) {
            console.log("Error: ", error);
        } finally {
            setConverting(false);
        }
    };

    const handleFavourite = (currency) => {
        let updated = [...favourites];

        if (updated.includes(currency)) {
            updated = updated.filter((fav) => fav !== currency);
        } else {
            updated.push(currency);
        }

        setFavourites(updated);
        localStorage.setItem("favourites", JSON.stringify(updated));
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    return (
        <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-semibold text-gray-700 text-center">
                Currency Convertor
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">

                {/* From Currency */}
                <div className="flex flex-col justify-center gap-1">
                    <CurrencyDropdown 
                        favourites={favourites}
                        currencies={currencies}
                        title="From:"
                        currency={fromCurrency}
                        setCurrency={setFromCurrency}
                        handleFavourite={handleFavourite}
                    />
                </div>

                {/* Swap Button */}
                <div className="flex justify-center items-center">
                    <button
                        onClick={swapCurrencies}
                        className="p-2.5 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 shadow-sm transition"
                    >
                        <HiArrowsRightLeft className="text-xl text-gray-600" />
                    </button>
                </div>

                {/* To Currency */}
                <div className="flex flex-col justify-center gap-1">
                    <CurrencyDropdown 
                        favourites={favourites}
                        currencies={currencies}
                        title="To:"
                        currency={toCurrency}
                        setCurrency={setToCurrency}
                        handleFavourite={handleFavourite}
                    />
                </div>

            </div>

            {/* Amount */}
            <div className="mt-5">
                <label 
                    htmlFor="amount"
                    className="text-gray-700 block font-medium text-sm mb-1"
                >
                    Amount:
                </label>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Convert Button */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={convertCurrency}
                    className={`px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 
                    ${converting ? "animate-pulse" : ""}`}
                >
                    Convert
                </button>
            </div>

            {/* Converted Amount */}
            {convertedAmount && (
                <div className="mt-4 text-lg font-medium text-green-600 text-right">
                    Converted Amount: {convertedAmount}
                </div>
            )}
        </div>
    );
};

export default CurrencyConvertor;

import "./searchBar.css";
import { AutoComplete } from "antd";

    const defaultOptions = [{
        label: "Project One",
        value: "Project One"
    },
    {
        label: "Project Two",
        value: "Project Two"
    },
    {
        label: "Project Three",
        value: "Project Three"
    }]
    function SearchBar() {
    const [options, setOptions] = useState(defaultOptions)

    const search = (searchedText) => {
        //API Call
        if(searchedText){
        setOptions([
            ...defaultOptions,
            {
                label: `${searchedText}`,
                value: `${searchedText}`,
            },
            {
                label: `${searchedText}` `${searchedText}`,
                value: `${searchedText}` `${searchedText}`,
            },
            {
                label: `${searchedText}` `${searchedText}` `${searchedText}`,
                value: `${searchedText}` `${searchedText}` `${searchedText}`,
            }
        ]); 
    } else {
        setOptions(defaultOptions)
    }
    return (
        <div className="SearchBar">
            <AutoComplete
            popupClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={500}
            style={{ width: 250 }} 
            placeholder= "Search for projects here" />
            options={options}
            filterOption={true}
            onSelect={(value) => {
                console.log("Selected Project", value);
            }}
            onSearch={(value) => {
                console.log("Searched Project", value);
                search(value);
            }}
        </div>
    );
}}

export default SearchBar;
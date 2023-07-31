import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    handleSearch(searchTerm); // Call handleSearch to trigger search
  };

  const handleSearch = (searchTerm) => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <InputGroup>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
      />
      <InputRightElement>
        <IconButton
          colorScheme="teal"
          icon={<SearchIcon />}
          aria-label="Search"
          onClick={() => handleSearch(searchTerm)}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;

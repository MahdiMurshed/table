import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = (value) => {
    setFilter(value || undefined);
  };
  return (
    <TextField
      sx={{
        paddingRight: "100px",
      }}
      fullWidth
      id="input-with-icon-textfield"
      label="Search"
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      variant="standard"
    />
  );
};

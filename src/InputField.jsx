import React, { useState } from "react";
import Card from "./Card";
import "./InputField.css";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import axios from "axios";
const InputField = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([["Unknown","No Such Country"]]);
  const SetInput = (event) => {
    setInput(event.target.value);
  };
  async function getCovidApi(event) {
    event.preventDefault();
    const response = await axios.get("https://api.covid19api.com/summary");
    let apiData = response.data.Countries;
    for (var data in apiData) {
      if (input.toLowerCase() === apiData[data].Country.toLowerCase()) {
        var TConfirmed = apiData[data].TotalConfirmed;
        var NConfirmed = apiData[data].NewConfirmed;
        var NDeaths = apiData[data].NewDeaths;
        
        setResult([["Total Confirmed",`${TConfirmed}`],["New Confirmed",`${NConfirmed}`],["New Deaths",`${NDeaths}`]])
        break;
      }
      else{
        setResult([["Unknown","No Such Country"]])
      }
    }
    console.log(result);
  }

  return (
    <>
      <div className="input container">
        <form>
          <FormControl className="col-12 my-3 col-sm-6 mx-auto col-lg-4">
            <InputLabel htmlFor="my-input">Enter Country Name...</InputLabel>
            <Input
              onChange={SetInput}
              id="my-input"
              aria-describedby="my-helper-text"
              autoComplete="off"
            />
          </FormControl>
          <Button
            className="col-12 my-3 col-sm-6 mx-auto col-lg-4"
            type="submit"
            onClick={getCovidApi}
            variant="contained"
            disabled={!input}
            color="secondary"
          >
            Search
          </Button>
        </form>
      </div>
      <div className="caseCards container">
        <div className="row">
        {result.map((val) => {
        return <Card head={val[0]} text={val[1]} />;
      })}
        </div>
      </div>
     
    </>
  );
};
export default InputField;

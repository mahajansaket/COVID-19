import { Typography } from "@material-ui/core";
import axios from "axios";
import Card from "./components/Card/Card.js";
import CardBody from "./components/Card/CardBody.js";
import CardHeader from "./components/Card/CardHeader.js";
import GridContainer from "./components/Grid/GridContainer.js";
// core components
import GridItem from "./components/Grid/GridItem.js";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [res, setResult] = useState([]);

  useEffect(() => {
    (async () => {
      let config = {
        headers: {
          "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
        },
      };

      const totalCases = await axios(
        "https://api.covid19api.com/summary",
        config
      );
      setData(totalCases.data);
      axios
        .get("https://corona.lmao.ninja/v2/countries")
        .then((response) => {
          let data = response.data;
          let b = Object.keys(data).reduce((p, c) => {
            let {
              country,
              cases,
              deaths,
              todayDeaths,
              todayCases,
              countryInfo: { flag },
            } = data[c];
            p.push({ country, cases, deaths, todayDeaths, todayCases, flag });
            return p;
          }, []);
          setResult(b);
        })
        .catch((err) => {
          console.log("error", err);
        });
    })();
  }, []);
  return (
    <div>
      {" "}
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <Typography variant="h4">New Cases Today</Typography>
            </CardHeader>
            <CardBody>
              <Typography align="center" variant="h4">
                <p>
                  {data &&
                    data.Global &&
                    data.Global.NewConfirmed.toLocaleString(
                      navigator.language,
                      { minimumFractionDigits: 0 }
                    )}
                </p>
              </Typography>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <Typography variant="h4">Total Deaths</Typography>
            </CardHeader>
            <CardBody>
              <Typography align="center" variant="h4">
                {" "}
                <p>
                  {data &&
                    data.Global &&
                    data.Global.TotalDeaths.toLocaleString(navigator.language, {
                      minimumFractionDigits: 0,
                    })}
                </p>
              </Typography>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <Typography variant="h4">Total Cases</Typography>
            </CardHeader>
            <CardBody>
              <Typography align="center" variant="h4">
                <p>
                  {data &&
                    data.Global &&
                    data.Global.TotalConfirmed.toLocaleString(
                      navigator.language,
                      { minimumFractionDigits: 0 }
                    )}
                </p>
              </Typography>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <MaterialTable
        title="COVID 19 Country Updates"
        columns={[
          {
            title: "Flag",
            field: "country",
            render: (res) => (
              <img
                alt="Flag"
                style={{ height: 20, borderRadius: "25%" }}
                src={res.flag}
              />
            ),
          },
          { title: "Country", field: "country" },
          { title: "Today Cases", field: "todayCases", type: "numeric" },
          {
            title: "Today Deaths",
            field: "todayDeaths",
            type: "numeric",
          },
          {
            title: "Total Deaths",
            field: "deaths",
            type: "numeric",
          },
          {
            title: "Total Cases",
            field: "cases",
            type: "numeric",
          },
        ]}
        data={res}
        defaultPageSize={50}
      />
    </div>
  );
}

export default App;

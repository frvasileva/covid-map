import { DataGrid } from "@material-ui/data-grid";

function CovidDataGrid(props) {
  var data = props.covidData;
  console.log("data", data);
  var rowsData = data.features.map((item, i) => {
    return {
      id: i,
      flag: "<img src='" + item.properties.countryInfo.flag + "'/>",
      country: item.properties.country,
      continent: item.properties.continent,
      active: item.properties.active,
      todayCases: item.properties.todayCases,
      cases: item.properties.cases,
      critical: item.properties.critical,
    };
  });
  console.log("rowsData ", rowsData);

  const columns = [
    { field: "country", headerName: "Country", width: 150 },
    { field: "continent", headerName: "Continent", width: 150 },
    { field: "active", headerName: "Active", width: 150 },
    { field: "todayCases", headerName: "Today cases", width: 150 },
    { field: "cases", headerName: "Cases", width: 150 },
    { field: "critical", headerName: "Critical", width: 150 },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
    <h2>Info by country:</h2>
      <DataGrid
        rows={rowsData}
        columns={columns}
        autoPageSize
        checkboxSelection={true}
      />
    </div>
  );
}

export default CovidDataGrid;

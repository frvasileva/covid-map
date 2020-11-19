import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./CovidTableInfo.scss";

function CovidTableInfo(props) {
  var data = props.covidData;

  return (
    <div className="table-wrapper">
    <h2>Info by country:</h2>
      <TableContainer component={Paper}>
        <Table className="info-table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell align="right">Тoday Cases</TableCell>
              <TableCell align="right">Active(per milion)</TableCell>
              <TableCell align="right">Critical</TableCell>
              <TableCell align="right">Tests</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.features.map((row) => (
              <TableRow key={row.properties.country}>
                <TableCell
                  component="th"
                  scope="row"
                  key={row.properties.country}
                >
                  <img
                    src={row.properties.countryInfo.flag}
                    className="country-flag"
                  />
                  {row.properties.country}
                </TableCell>
                <TableCell align="right">{row.properties.todayCases.toLocaleString()}</TableCell>
                <TableCell align="right">
                  {row.properties.active.toLocaleString()}
                  <br />
                  <span>Per million: </span>
                  {row.properties.activePerOneMillion.toLocaleString()}
                </TableCell>
                <TableCell align="right">{row.properties.cases.toLocaleString()}</TableCell>
                <TableCell align="right">
                  {row.properties.critical.toLocaleString()}
                  <br />
                  <span>Per million: </span>
                  {row.properties.criticalPerOneMillion.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CovidTableInfo;

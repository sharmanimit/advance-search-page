import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  Grid,
  MenuItem,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  Chip,
} from "@material-ui/core";
import "../Components/Gridsystem.css";
import SearchIcon from "@material-ui/icons/Search";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Filter,
  Sort,
  Resize,
} from "@syncfusion/ej2-react-grids";

import axios from "axios";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Autocomplete, Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  formControls: {
    minWidth: 1000,
  },
}));

export default function Gridsystem() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  {
    /*const [filtertopen, setFilteropen] = useState(false);*/
  }
  {
    /*const StartDate: Date = new Date(newdate().getFullYear(),new Date().getMonth(),10);
const EndDate: Date = new Date(newdate().getFullYear(),new Date().getMonth(),25) */
  }
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(true);
  const [searchTerm, setSearchTerm] = useState({
    search: "",
    to: "",
    from: "",
    names: "",
    files: "",
    types: "",
    // uploadedbye
  });

  const [sendname, setSendName] = useState("");
  const [typefilter, setTypeFilter] = useState("");
  const [createdfilter, setCreatedFilter] = useState("");
  const [Counts, setCounts] = useState({
    signal:[],
    service:[],
    personal:[],
    LastWeek: [],
    LastMonth: [],
    LastYear:[],
    corp:[],
    zzzfdsf:[],  
  })
  const [subjectfilter, setSubjectFilter] = useState("");
  const [data,setData]= useState({});
  const getProductData = async () => {
    const { search, to, from, names, files, types } = searchTerm;

    const response = await axios.get(
      `/advance-search?${names && `createdby=${names}`}&${
        files && `filename=${files}`
      }&${search && `content=${search}`}&${types && `type=${types}`}&${
        from && `datefrom=${from}`
      }&${to && `dateto=${to}`}`
    );
    setProduct(response.data.data);
    console.log(response.data.data);
  };

  console.log("The object keys are",Object.keys(data))

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSearchTerm({
      ...searchTerm,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getProductData();
    setOpen(false);
  };

  const getSendData = async () => {
    const response = await axios.get(
      "/createdby-filter",
      {
        params: {
          createdby: sendname,
        },
      }
    );
    console.log(response.data.data);
    // setFilter(response.data);
    setProduct(response.data.data);
  };

  useEffect(() => {
    getSendData();
  }, [sendname]);

  console.log(sendname);

  const handleSend = (value) => {
    setSendName(value);
    console.log(value);
  };

  const getTypeData = async () => {
    const response = await axios.get("/owner-filter", {
      params: {
        owner: typefilter,
      },
    });
    console.log(response.data.data);
    setProduct(response.data.data);
    setCounts({
      ...Counts,
      [typefilter]:response.data.data
    })
  };
  useEffect(() => {
    getTypeData();
  }, [typefilter]);                                                                                                                             

  const handletype = (value) => {
    setTypeFilter(value);
    console.log(value);
  };

  const getCreatedData = async () => {
    const response = await axios.get("/type", {
      params: {
        type: createdfilter,
      },
    });
    console.log(response.data.data);
    setProduct(response.data.data);
    setCounts({
      ...Counts,
      [createdfilter]:response.data.data
    })
  };
  useEffect(() => {
    getCreatedData();
  }, [createdfilter]);
  const handlecreated = (value) => {
    setCreatedFilter(value);
    console.log(value);
  };

  const getSubjectData = async () => {
    const response = await axios.get(
      "/datefilter",
      {
        params: {
          sType: subjectfilter,
        },
      }
    );
    console.log(response.data.data);
    setProduct(response.data.data);
    setCounts({
      ...Counts,
      [subjectfilter]:response.data.data
    })
  };
  useEffect(() => {
    getSubjectData();
  }, [subjectfilter]);
  const handlesubject = (value) => {
    setSubjectFilter(value);
    console.log(value);
  };
  const onChange = (e) => {
    setSearchTerm(e.text);
  };

  const getdata = async () => {
    const response = await axios.get(
      "/nav-data"
      
    );
    console.log("my gfhfhgfh",response.data);
    setData(response.data)
   
    
    // setFilter(response.data);
    
  };
  useEffect(() => {
    getdata();
  }, []);
  
 
  // for (const [key, value] of Object.entries(data)) {
  //   console.log(`${key}: ${value}`);
  // }

  const { search, to, from, names, files, types } = searchTerm;

  return (
    <Grid>
      <div className="Advance">
        <Typography
          variant="h4"
          color="primary"
          style={{
            textAlign: "center",
            marginTop: "3rem",
            marginBottom: "1rem",
          }}
        >
          Advance Search Page
        </Typography>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid
            container
            spacing={2}
            style={{ maxWidth: "800px", margin: "0 2rem" }}
          >
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                color="primary"
                label="Content"
                size="small"
                fullWidth
                className="Date_field"
                value={searchTerm.search}
                onChange={handleInputChange}
                name="search"
                style={{ borderRadius: ".5rem" }}
                startIcon={<SearchIcon />}
              />
            </Grid>

            {show && (
              <>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    label="SEND BY:"
                    value={searchTerm.names}
                    onChange={handleInputChange}
                    name="names"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    native="true"
                    variant="outlined"
                    fullWidth
                    size="small"
                    label="TYPE:"
                    name="types"
                    value={searchTerm.types}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="choose one option">
                      Choose one option
                    </MenuItem>
                    <MenuItem value="personal">personal</MenuItem>
                    <MenuItem value="enclosure">ENCLOSURE</MenuItem>
                    <MenuItem value="service letter">SERVICE LETTER</MenuItem>
                    <MenuItem value="service note">SERVICE NOTE</MenuItem>
                    <MenuItem value="minute of metting">
                      MINUTE OF METTING{" "}
                    </MenuItem>
                    <MenuItem value="demo">DEMO OFFICIAL</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    label="FILE NO:"
                    value={searchTerm.files}
                    onChange={handleInputChange}
                    name="files"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    label="FILE SUBJECT:"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    label="OLD FILE REFERENCE:"
                  />
                </Grid>
                <Grid xs={6}>
                  <DateRangePickerComponent
                    placeholder="DATE"
                    format="dd-MM-yyyy"
                    startDate={searchTerm.from}
                    endDate={searchTerm.to}
                    onchange={onChange}
                  ></DateRangePickerComponent>
                </Grid>
              </>
            )}
            <Grid xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                style={{ float: "right", marginLeft: "1rem" }}
              >
                Search
              </Button>
              <Button
                onClick={() => setShow(!show)}
                color="primary"
                variant="contained"
                style={{ float: "right" }}
              >
                {show ? "Close" : "Advance Search"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Grid item xs={12}>
      <div style={{float:"left"}}>
        {createdfilter && (
          <Chip
            icon
            label={`DOC TYPE:${createdfilter}`}
            onDelete={() => setCreatedFilter("")}
          />
        )}
        {sendname && (
          <Chip
            icon
            label={`CREATED BY:${sendname}`}
            onDelete={() => setSendName("")}
          />
        )}
        {typefilter && (
          <Chip
            icon
            label={`OWNER:${typefilter}`}
            onDelete={() => setTypeFilter("")}
          />
        )}
        {subjectfilter && (
          <Chip
            icon
            label={`MODIFY DATE:${subjectfilter}`}
            onDelete={() => setSubjectFilter("")}
          />
        )}
        </div>
      </Grid>

      <Grid
        item
        xs={12}
        style={{ justifyContent: "space-between", padding: "0.5rem" }}
      >
        <Grid
          item
          xs={10}
          style={{
            justifyContent: "space-between",
            float: "right",
          }}
        >
          <GridComponent
            dataSource={product}
            height={Number(window.innerHeight - 300)}
            allowResizing={true}
            allowSorting={true}
            allowPaging={true}
            pageSettings={{ pageCount: 5, pageSizes: true }}
            allowFiltering={true}
            filterSettings={{ type: "Menu" }}
            style={{ top: "3rem" }}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="createdby"
                headerText={"SEND BY"}
                width="90"
                textAlign="left"
              />
              <ColumnDirective
                field="content"
                width="200"
                headerText={"CONTENT"}
              />
              <ColumnDirective
                field="type"
                headerText={"TYPE"}
                width="150"
                textAlign="center"
              />
              <ColumnDirective
                field="filename"
                headerText={"FILE NO"}
                width="130"
                //format="yMd"
                textAlign="center"
              />
              <ColumnDirective
                field="modifieddate"
                headerText={"MODIFIED DATE"}
                width="130"
                format="yMd"
                textAlign="Right"
              />
            </ColumnsDirective>
            <Inject services={[Resize, Page, Sort, Filter]} />
          </GridComponent>
        </Grid>
        <Grid
          item
          xs={2}
          spacing={2}
          style={{ padding: "3.1rem .7rem 0rem 0rem" }}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>OWNER:</Typography>
            </AccordionSummary>

            <MenuItem onClick={() => handletype("zzzfdsf")}>zzzfdsf ({Counts.zzzfdsf.length})</MenuItem>
            <MenuItem onClick={() => handletype("corp")}>corp ({Counts.corp.length})</MenuItem>
         
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Created BY:</Typography>
            </AccordionSummary>

            <MenuItem onClick={() => handleSend("zzzklfdsds")}>zzzklfdsds ({sendname.length})</MenuItem>
            <MenuItem onClick={() => handleSend("7WG")}>7WG ({sendname.length})</MenuItem>
            <MenuItem onClick={() => handleSend("9WG")}>9WG ({sendname.length})</MenuItem>
            

            
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>MODIFY DATE:</Typography>
            </AccordionSummary>
            <MenuItem onClick={() => handlesubject("LastWeek")}>
              Last Week ({Counts.LastWeek.length})
            </MenuItem>
            <MenuItem onClick={() => handlesubject("LastMonth")}>
              Last Month ({Counts.LastMonth.length})
            </MenuItem>
            <MenuItem onClick={() => handlesubject("LastYear")}>
            Last Year ({Counts.LastYear.length})
          </MenuItem>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>DOC TYPE:</Typography>
            </AccordionSummary>
            <MenuItem onClick={() => handlecreated("signal")}>signal ({Counts.signal.length})</MenuItem>
            <MenuItem onClick={() => handlecreated("service")}>service ({Counts.service.length})</MenuItem>
            <MenuItem onClick={() => handlecreated("personal")}>personal ({Counts.personal.length})</MenuItem>
          </Accordion>
         
         

          {
            data?Object.keys(data).map((childObj)=>{
              
              return <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
              <Typography>{childObj}</Typography>
              </AccordionSummary>               
                {
                  Object.keys(data[childObj]).map((innerChild)=>{
                    return  <MenuItem onClick={()=>{handledata(childObj)}}>{`${innerChild} ( ${data[childObj][innerChild] } )`}</MenuItem>
                        
                  })
                }
              </Accordion> 
                          
            }):""
          }

       
        </Grid>
      </Grid>
    </Grid>
  );
}

// {
//   Object.keys(data[childObj]).map((innerChild)=>{
//     return  <Accordion>
//     <AccordionSummary
//       expandIcon={<ExpandMoreIcon />}
//       aria-controls="panel1a-content"
//       id="panel1a-header"
//     >
       
//       <MenuItem>{`${innerChild} ( ${data[childObj][innerChild] } )`}</MenuItem>
        
//     </AccordionSummary>
//     </Accordion>
//   })
// }
import React, {Component} from 'react';
import axios from 'axios'
import ReactTooltip from "react-tooltip";
import ReactTable from "react-table";  
import "react-table/react-table.css" 

export default class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomer: 1
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCustomerData();
  }
handleHover(){
    this.setState(prevState => ({
        isHovered: !prevState.isHovered
    }));
}
  //Function to get the Customer Data from json
  getCustomerData() {
    axios.get('http://cpp-tech-exercise.s3.eu-west-2.amazonaws.com/kickstarter.json').then(response => {
      this.setState({productList: response})
    })
  };

  render() {
    
    if (!this.state.productList)
      return (<p>Loading data</p>)
      console.log(this.state.productList.data)
    return (
      <div>
        {/* Add  ReactTooltip in the Cell only */}
        <ReactTooltip clickable={true} html={true} className="tiptool" place="right" type="success" effect="solid" />
        <ReactTable
          data={this.state.productList.data}
          columns={[
            {
              Header: "kickstarter",
              columns: [
                {
                  Header: "Serial Number",
                  accessor: "s.no",
                  Cell: (row) => {
                  return (<span data-tip={"<table><tr><td>Title</td><td>Blurb</td><td>amount pledged</td><td>num_backers</td><td>project</td></tr><tr><td>"+row.original["title"]+"</td><td>"+row.original["blurb"]+"</td><td>"+row.original["amt.pledged"]+"</td><td>"+row.original["num.backers"]+"</td><td><a href="+row.original["num.backers"]+">click here</a></td></tr></table>"}>{row.original["s.no"]}</span>);
                  }
                },{
                  Header: "percentage.funded",
                  accessor: "percentage.funded",
                  Cell: (row) => {
                    return <span data-tip={row.original["percentage.funded"]}>{row.original["percentage.funded"]}</span>;
                  }
                },{
                  Header: "Amount Pledged",
                  accessor: "amt.pledged",
                  Cell: (row) => {
                    return <span data-tip={row.original["amt.pledged"]}>{row.original["amt.pledged"]}</span>;
                  }
                }
              ]
            }
          ]}
          defaultPageSize={10}
          onPageSizeChange={() => {
            ReactTooltip.rebuild();
          }}
          className="-striped -highlight"
        />
        <br />
      </div>
    )
  }

}

import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import CustomerDetails from './CustomerDetails';
import axios from 'axios';

export default class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomer: 1,
      customerList: null
    };
  }

  // Function which is called the first time the component loads
  componentDidMount() {
    this.getCustomerData();
  }

  // Function to get the Customer Data from JSON
  getCustomerData() {
    // ✅ FIX: added "/" before assets so Azure finds the file correctly
    axios.get('/assets/samplejson/customerlist.json')
      .then(response => {
        this.setState({ customerList: response });
      })
      .catch(error => {
        console.error("Error loading customer list:", error);
      });
  }

  render() {
    if (!this.state.customerList) {
      return <p>Loading data...</p>;
    }

    return (
      <div className="addmargin row">
        <div className="col-md-3">
          {this.state.customerList.data.map(customer => (
            <Card key={customer.name} className="mb-3 text-center border-info">
              <Card.Header as="h5" className="bg-info text-white">
                {customer.name}
              </Card.Header>
              <Card.Body>
                <p>{customer.email}</p>
                <p>{customer.phone}</p>
                <Button
                  variant="info"
                  onClick={() => this.setState({ selectedCustomer: customer.id })}
                >
                  Click to View Details
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        <div className="col-md-6">
          <CustomerDetails val={this.state.selectedCustomer} />
        </div>
      </div>
    );
  }
}

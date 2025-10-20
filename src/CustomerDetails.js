import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

// This Component is a child Component of Customers Component
export default class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Function which is called when the component loads for the first time
  componentDidMount() {
    this.getCustomerDetails(this.props.val);
  }

  // Function which is called whenever the component is updated
  componentDidUpdate(prevProps) {
    // get Customer Details only if props have changed
    if (this.props.val !== prevProps.val) {
      this.getCustomerDetails(this.props.val);
    }
  }

  // Function to load the customer details data from JSON
  getCustomerDetails(id) {
    // ✅ FIX: added leading slash for Azure (important!)
    axios
      .get(`/assets/samplejson/customer${id}.json`)
      .then(response => {
        this.setState({ customerDetails: response });
      })
      .catch(error => {
        console.error('Error loading customer details:', error);
      });
  }

  render() {
    if (!this.state.customerDetails) return <p>Loading Data...</p>;

    const data = this.state.customerDetails.data;

    return (
      <div className="customerdetails">
        <Card className="border-info mb-3 text-center">
          <Card.Header as="h3" className="bg-info text-white">
            {data.name}
          </Card.Header>
          <Card.Body>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Phone:</strong> {data.phone}</p>
            <p><strong>City:</strong> {data.city}</p>
            <p><strong>State:</strong> {data.state}</p>
            <p><strong>Country:</strong> {data.country}</p>
            <p><strong>Organization:</strong> {data.organization}</p>
            <p><strong>Job Profile:</strong> {data.jobProfile}</p>
            <p><strong>Additional Info:</strong> {data.additionalInfo}</p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

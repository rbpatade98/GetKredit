export const reportsMock = [
  {
    id: 1,
    name: "Sales Report",
    description: "Detailed analysis of sales leads and regional performance.",
    data: {
      columns: [
        { field: "name", headerName: "Lead name", flex: 1, minWidth: 160 },
        { field: "creationDate", headerName: "Lead creation date", flex: 1, minWidth: 160 },
        { field: "contactPerson", headerName: "Contact person", flex: 1, minWidth: 140 },
        { field: "designation", headerName: "Designation", flex: 1, minWidth: 120 },
        { field: "contactDetails", headerName: "Contact details", flex: 1, minWidth: 200 },
        { field: "region", headerName: "Region", flex: 1, minWidth: 100 },
        { field: "location", headerName: "Location", flex: 1, minWidth: 120 },
      ],
      rows: [
        { id: 1, name: "Sun Jin-Woo", creationDate: "2023-03-23", contactPerson: "Danish Khan", designation: "Manager", phone: "566-204-2981", email: "creola1@yahoo.com", region: "North", location: "Mumbai" },
        { id: 2, name: "Rahul Sharma", creationDate: "2023-03-24", contactPerson: "Amit Verma", designation: "Assistant", phone: "987-654-3210", email: "rahul@gmail.com", region: "West", location: "Pune" },
        { id: 3, name: "Priya Mehta", creationDate: "2023-03-25", contactPerson: "Sneha Patil", designation: "Executive", phone: "912-345-6780", email: "priya@gmail.com", region: "South", location: "Bangalore" },
        { id: 4, name: "Amit Singh", creationDate: "2023-03-26", contactPerson: "Rohit Gupta", designation: "Manager", phone: "901-234-5678", email: "amit@gmail.com", region: "East", location: "Kolkata" },
        { id: 5, name: "Neha Kapoor", creationDate: "2023-03-27", contactPerson: "Anjali Shah", designation: "HR", phone: "889-765-4321", email: "neha@gmail.com", region: "North", location: "Delhi" },
        { id: 6, name: "Karan Patel", creationDate: "2023-03-28", contactPerson: "Vikas Yadav", designation: "Developer", phone: "778-123-4567", email: "karan@gmail.com", region: "West", location: "Ahmedabad" },
        { id: 7, name: "Sneha Iyer", creationDate: "2023-03-29", contactPerson: "Arjun Nair", designation: "Designer", phone: "667-234-5678", email: "sneha@gmail.com", region: "South", location: "Chennai" },
        { id: 8, name: "Rohit Das", creationDate: "2023-03-30", contactPerson: "Sourav Paul", designation: "Analyst", phone: "556-345-6789", email: "rohit@gmail.com", region: "East", location: "Kolkata" },
        { id: 9, name: "Anjali Verma", creationDate: "2023-03-31", contactPerson: "Deepak Kumar", designation: "Manager", phone: "445-456-7890", email: "anjali@gmail.com", region: "North", location: "Noida" },
        { id: 10, name: "Vikram Joshi", creationDate: "2023-04-01", contactPerson: "Manish Singh", designation: "Lead", phone: "334-567-8901", email: "vikram@gmail.com", region: "West", location: "Mumbai" },
      ],
    },
  },
  {
    id: 2,
    name: "Leads Report",
    description: "Overview of all active and closed leads.",
    data: {
      columns: [
        { field: "leadName", headerName: "Lead Name", flex: 1, minWidth: 150 },
        { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
        { field: "assignedTo", headerName: "Assigned To", flex: 1, minWidth: 150 },
        { field: "date", headerName: "Date", flex: 1, minWidth: 130 },
      ],
      rows: [
        { id: 1, leadName: "Acme Corp", status: "Open", assignedTo: "Danish Khan", date: "Mar 23, 2023" },
        { id: 2, leadName: "Beta Ltd", status: "Closed", assignedTo: "Sara Ali", date: "Mar 24, 2023" },
        { id: 3, leadName: "Gamma Inc", status: "Pending", assignedTo: "Raj Mehta", date: "Mar 25, 2023" },
        { id: 4, leadName: "Delta Co", status: "Open", assignedTo: "Danish Khan", date: "Mar 26, 2023" },
      ],
    },
  },
  {
    id: 3,
    name: "Accounts Report",
    description: "Bank account balances and types across the organization.",
    data: {
      columns: [
        { field: "account", headerName: "Account", flex: 1, minWidth: 150 },
        { field: "type", headerName: "Type", flex: 1, minWidth: 120 },
        { field: "balance", headerName: "Balance", flex: 1, minWidth: 130 },
        { field: "date", headerName: "Date", flex: 1, minWidth: 130 },
      ],
      rows: [
        { id: 1, account: "HDFC - 001", type: "Savings", balance: "₹1,20,000", date: "Mar 23, 2023" },
        { id: 2, account: "ICICI - 002", type: "Current", balance: "₹80,500", date: "Mar 23, 2023" },
        { id: 3, account: "SBI - 003", type: "Savings", balance: "₹2,10,000", date: "Mar 23, 2023" },
      ],
    },
  },
  {
    id: 4,
    name: "Invoices Report",
    description: "Tracking of invoices, clients, and payment statuses.",
    data: {
      columns: [
        { field: "invoiceNo", headerName: "Invoice No", flex: 1, minWidth: 140 },
        { field: "client", headerName: "Client", flex: 1, minWidth: 150 },
        { field: "amount", headerName: "Amount", flex: 1, minWidth: 120 },
        { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
        { field: "date", headerName: "Date", flex: 1, minWidth: 130 },
      ],
      rows: [
        { id: 1, invoiceNo: "INV-001", client: "Acme Corp", amount: "₹50,000", status: "Paid", date: "Mar 23, 2023" },
        { id: 2, invoiceNo: "INV-002", client: "Beta Ltd", amount: "₹30,000", status: "Pending", date: "Mar 24, 2023" },
        { id: 3, invoiceNo: "INV-003", client: "Gamma Inc", amount: "₹70,000", status: "Paid", date: "Mar 25, 2023" },
      ],
    },
  },
  {
    id: 5,
    name: "Transactions Report",
    description: "History of bank transactions and account credits/debits.",
    data: {
      columns: [
        { field: "bank", headerName: "Bank", flex: 1, minWidth: 150 },
        { field: "transaction", headerName: "Transaction", flex: 1, minWidth: 150 },
        { field: "amount", headerName: "Amount", flex: 1, minWidth: 120 },
        { field: "date", headerName: "Date", flex: 1, minWidth: 130 },
      ],
      rows: [
        { id: 1, bank: "HDFC", transaction: "Credit", amount: "₹10,900", date: "Mar 23, 2023" },
        { id: 2, bank: "ICICI", transaction: "Debit", amount: "₹5,000", date: "Mar 24, 2023" },
        { id: 3, bank: "SBI", transaction: "Credit", amount: "₹25,000", date: "Mar 25, 2023" },
      ],
    },
  },
];

export const emptyFiltersMock = {
  name: "",
  creationDate: "",
  contactPerson: "",
  designation: "",
  contactDetail: "",
  region: "",
  location: "",
};

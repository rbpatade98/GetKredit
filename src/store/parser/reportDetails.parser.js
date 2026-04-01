// ✅ Sales Report Parser
export const salesReportParser = (report) => {
  return {
    id: report?.id,
    name: report?.name,
    description: report?.description,
    columns: report?.data?.columns,
    rows: report?.data?.rows?.map((row) => ({
      id: row?.id,
      name: row?.name,
      creationDate: row?.creationDate,
      contactPerson: row?.contactPerson,
      designation: row?.designation,
      phone: row?.phone,
      email: row?.email,
      region: row?.region,
      location: row?.location,
    })) || [],
  };
};

// ✅ Leads Report Parser
export const leadsReportParser = (report) => {
  return {
    id: report?.id,
    name: report?.name,
    description: report?.description,
    columns: report?.data?.columns,
    rows: report?.data?.rows?.map((row) => ({
      id: row?.id,
      leadName: row?.leadName,
      status: row?.status,
      assignedTo: row?.assignedTo,
      date: row?.date,
    })) || [],
  };
};

// ✅ Accounts Report Parser
export const accountsReportParser = (report) => {
  return {
    id: report?.id,
    name: report?.name,
    description: report?.description,
    columns: report?.data?.columns,
    rows: report?.data?.rows?.map((row) => ({
      id: row?.id,
      account: row?.account,
      type: row?.type,
      balance: row?.balance,
      date: row?.date,
    })) || [],
  };
};

// ✅ Invoices Report Parser
export const invoicesReportParser = (report) => {
  return {
    id: report?.id,
    name: report?.name,
    description: report?.description,
    columns: report?.data?.columns,
    rows: report?.data?.rows?.map((row) => ({
      id: row?.id,
      invoiceNo: row?.invoiceNo,
      client: row?.client,
      amount: row?.amount,
      status: row?.status,
      date: row?.date,
    })) || [],
  };
};

// ✅ Transactions Report Parser
export const transactionsReportParser = (report) => {
  return {
    id: report?.id,
    name: report?.name,
    description: report?.description,
    columns: report?.data?.columns,
    rows: report?.data?.rows?.map((row) => ({
      id: row?.id,
      bank: row?.bank,
      transaction: row?.transaction,
      amount: row?.amount,
      date: row?.date,
    })) || [],
  };
};

// ✅ Main Parser Function (auto detect report)
export const getParsedReport = (report) => {
  switch (report?.id) {
    case 1:
      return salesReportParser(report);
    case 2:
      return leadsReportParser(report);
    case 3:
      return accountsReportParser(report);
    case 4:
      return invoicesReportParser(report);
    case 5:
      return transactionsReportParser(report);
    default:
      return report;
  }
};
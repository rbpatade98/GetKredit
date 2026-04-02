// ✅ Sales Report Parser
export const salesReportParser = (report) => {
  return {
    id: report?.id ?? "N/A",
    name: report?.name ?? "N/A",
    description: report?.description ?? "N/A",
    columns: report?.data?.columns ?? "N/A",
    rows: report?.data?.rows?.map((row) => ({
      id: row?.id ?? "N/A",
      name: row?.name ?? "N/A",
      creationDate: row?.creationDate ?? "N/A",
      contactPerson: row?.contactPerson ?? "N/A",
      designation: row?.designation ?? "N/A",
      phone: row?.phone ?? "N/A",
      email: row?.email ?? "N/A",
      region: row?.region ?? "N/A",
      location: row?.location ?? "N/A",
    })) || [],
  };
};

// ✅ Leads Report Parser
export const leadsReportParser = (report) => {
  return {
    id: report?.id ?? "N/A",
    name: report?.name ?? "N/A",
    description: report?.description ?? "N/A",
    columns: report?.data?.columns ?? "N/A",
    rows: report?.data?.rows?.map((row) => ({
      id: row?.id ?? "N/A",
      leadName: row?.leadName ?? "N/A",
      status: row?.status ?? "N/A",
      assignedTo: row?.assignedTo ?? "N/A",
      date: row?.date ?? "N/A",
    })) || [],
  };
};

// ✅ Accounts Report Parser
export const accountsReportParser = (report) => {
  return {
    id: report?.id ?? "N/A",
    name: report?.name ?? "N/A",
    description: report?.description ?? "N/A",
    columns: report?.data?.columns ?? "N/A",
    rows: report?.data?.rows?.map((row) => ({
      id: row?.id ?? "N/A",
      account: row?.account ?? "N/A",
      type: row?.type ?? "N/A",
      balance: row?.balance ?? "N/A",
      date: row?.date ?? "N/A",
    })) || [],
  };
};

// ✅ Invoices Report Parser
export const invoicesReportParser = (report) => {
  return {
    id: report?.id ?? "N/A",
    name: report?.name ?? "N/A",
    description: report?.description ?? "N/A",
    columns: report?.data?.columns ?? "N/A",
    rows: report?.data?.rows?.map((row) => ({
      id: row?.id ?? "N/A",
      invoiceNo: row?.invoiceNo ?? "N/A",
      client: row?.client ?? "N/A",
      amount: row?.amount ?? "N/A",
      status: row?.status ?? "N/A",
      date: row?.date ?? "N/A",
    })) || [],
  };
};

// ✅ Transactions Report Parser
export const transactionsReportParser = (report) => {
  return {
    id: report?.id ?? "N/A",
    name: report?.name ?? "N/A",
    description: report?.description ?? "N/A",
    columns: report?.data?.columns ?? "N/A",
    rows: report?.data?.rows?.map((row) => ({
      id: row?.id ?? "N/A",
      bank: row?.bank ?? "N/A",
      transaction: row?.transaction ?? "N/A",
      amount: row?.amount ?? "N/A",
      date: row?.date ?? "N/A",
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
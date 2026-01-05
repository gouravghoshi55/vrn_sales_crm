const API_URL =
  "https://script.google.com/macros/s/AKfycbzWrw09PfFEFV6zP8ZafGQbBIILhtaqfiSz9P9zh98sX0EvbdTPpJANvkx8MbM3I1in/exec";
const buildParams = (baseParams = {}, filterParams = {}) => {
  const params = new URLSearchParams(baseParams);

  if (filterParams?.fromDate) {
    params.append("fromDate", filterParams.fromDate);
  }
  if (filterParams?.toDate) {
    params.append("toDate", filterParams.toDate);
  }
  if (filterParams?.status) {
    params.append("status", filterParams.status);
  }
  if (filterParams?.leadQualified) {
    params.append("leadQualified", filterParams.leadQualified);
  }

  return params.toString();
};

// Step 1: Call to Broker (FMS sheet) - default action
export const fetchCallToBrokerData = async ({
  fromDate,
  toDate,
  status,
  leadQualified,
} = {}) => {
  const query = buildParams({}, { fromDate, toDate, status, leadQualified });
  const url = query ? `${API_URL}?${query}` : API_URL;
  const res = await fetch(url);
  return res.json();
};

// Step 2: Followup (Followup sheet) - explicit action
export const fetchFollowupData = async ({ fromDate, toDate, status } = {}) => {
  const query = buildParams(
    { action: "fetchFollowup" },
    { fromDate, toDate, status }
  );
  const res = await fetch(`${API_URL}?${query}`);
  return res.json();
};

// Update for Step 1: Call to Broker
// Update for Step 1: Call to Broker
export const submitCallToBrokerAction = async (payload) => {
  const params = new URLSearchParams({
    action: "updateStep1",
    rowNumber: payload.rowNumber,
    status: payload.status || "",
    leadQualified: payload.leadQualified || "",
    contactPerson: payload.contactPerson || "",
    rera: payload.rera || "",
    remark: payload.remark || "",
    days: payload.days || "",
    actualDate: payload.actualDate || new Date().toISOString(), // Add actual date
  });

  const res = await fetch(`${API_URL}?${params.toString()}`);
  return res.json();
};

// Update for Step 2: Followup
export const submitFollowupAction = async (payload) => {
  const params = new URLSearchParams({
    action: "updateFollowup",
    rowNumber: payload.rowNumber,
    status: payload.status || "",
    contactPerson: payload.contactPerson || "",
    rera: payload.rera || "",
    remark: payload.remark || "",
    days: payload.days || "",
  });

  const res = await fetch(`${API_URL}?${params.toString()}`);
  return res.json();
};

// Step 3: Meetings (FMS sheet)
export const fetchMeetingsData = async ({ fromDate, toDate, status } = {}) => {
  const query = buildParams(
    { action: "fetchMeetings" },
    { fromDate, toDate, status }
  );
  const res = await fetch(`${API_URL}?${query}`);
  return res.json();
};

// Update for Meetings
export const submitMeetingsAction = async (payload) => {
  const params = new URLSearchParams({
    action: "updateMeetings",
    rowNumber: payload.rowNumber,
    status: payload.status || "",
    remark: payload.remark || "",
  });

  const res = await fetch(`${API_URL}?${params.toString()}`);
  return res.json();
};

// Get pending follow-ups that need to be created from FMS
export const getPendingFollowups = async () => {
  const params = new URLSearchParams({ action: "getPendingFollowups" });
  const res = await fetch(`${API_URL}?${params.toString()}`);
  return res.json();
};

// Get pending next-level follow-ups from Followup sheet
export const getPendingNextFollowups = async () => {
  const params = new URLSearchParams({ action: "getPendingNextFollowups" });
  const res = await fetch(`${API_URL}?${params.toString()}`);
  return res.json();
};

// Create follow-ups in batch
export const createFollowups = async (followupsArray) => {
  const params = new URLSearchParams({
    action: "createFollowups",
    followups: JSON.stringify(followupsArray),
  });
  const res = await fetch(`${API_URL}?${params.toString()}`);
  return res.json();
};

// Get holidays list
export const getHolidays = async () => {
  const params = new URLSearchParams({ action: "getHolidays" });
  const res = await fetch(`${API_URL}?${params.toString()}`);
  return res.json();
};

import { useState } from "react";
import { useQuery } from "@tanstack/react-query"; // NEW: TanStack Query
import { fetchCallToBrokerData } from "../services/fmsApi";
import ActionModal from "./ActionModal";
import { Button, Table, Form } from "react-bootstrap";
import Layout from "../components/Layout";
import SkeletonTable from "../components/SkeletonTable";

function CallToBroker() {
  // Filter states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [leadQualified, setLeadQualified] = useState("");

  // Selected row for modal
  const [selectedRow, setSelectedRow] = useState(null);

  // TanStack Query: fetches and caches data
  const {
    data: rows = [],          // Default empty array if no data
    isLoading,
    refetch,                  // To refresh after modal success
  } = useQuery({
    // Cache key: changes when any filter changes → auto refetch
    queryKey: ["callToBroker", fromDate, toDate, status, leadQualified],
    queryFn: () => fetchCallToBrokerData({
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      status: status || undefined,
      leadQualified: leadQualified || undefined,
    }),
    // Extract data from response
    select: (res) => res?.data || [],
    // Cache for 5 minutes (adjust as needed)
    staleTime: 1000 * 60 * 5,
    // Keep cached data for 30 minutes
    gcTime: 1000 * 60 * 30,
  });

  const handleApplyFilter = () => {
    if ((fromDate || toDate) && (!fromDate || !toDate)) {
      alert("Please select both From and To dates");
      return;
    }
    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      alert("From Date cannot be after To Date");
      return;
    }

    // No need to call loadData — changing state updates queryKey → auto refetch
  };

  const handleClearFilter = () => {
    setFromDate("");
    setToDate("");
    setStatus("");
    setLeadQualified("");
    // State change triggers refetch automatically
  };

  // Format date for display
  const formatDate = (dateVal) => {
    if (!dateVal) return "-";
    const date = new Date(dateVal);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout
      breadcrumbs={[
        { name: "Process Flow", path: "/channel-partner/cp-outgoing/process" },
        { name: "Call to Broker", path: "/process/call-to-broker" },
      ]}
    >
      <div className="container my-5">
        <div className="card shadow-sm border-0 overflow-hidden">
          {/* Header */}
          <div className="card-header bg-primary text-white py-4 text-center">
            <h3 className="mb-0 fw-bold d-flex align-items-center justify-content-center gap-3">
              <i className="bi bi-telephone-inbound fs-2"></i>
              Call to Broker
            </h3>
          </div>

          {/* Filter Bar */}
          <div className="card-body pt-4 px-4 border-bottom">
            <Form className="row g-3 align-items-end">
              <div className="col-md-2">
                <Form.Label className="fw-medium">From Date</Form.Label>
                <Form.Control
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <Form.Label className="fw-medium">To Date</Form.Label>
                <Form.Control
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <Form.Label className="fw-medium">Status</Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="CRR">CRR</option>
                  <option value="Agreed to next meeting">Agreed to next meeting</option>
                  <option value="Call Again">Call Again</option>
                </Form.Select>
              </div>

              <div className="col-md-3">
                <Form.Label className="fw-medium">Is Lead Qualified</Form.Label>
                <Form.Select
                  value={leadQualified}
                  onChange={(e) => setLeadQualified(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
              </div>

              <div className="col-md-2 d-flex gap-2">
                <Button
                  variant="primary"
                  onClick={handleApplyFilter}
                  disabled={isLoading}
                >
                  <i className="bi bi-funnel me-2"></i>
                  Apply
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={handleClearFilter}
                  disabled={isLoading}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Clear
                </Button>
              </div>
            </Form>
          </div>

          {/* Table Body */}
          <div className="card-body p-0 px-4 pb-4">
            {isLoading ? (
              <SkeletonTable rowsCount={8} />
            ) : rows.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <i className="bi bi-inbox fs-1 d-block mb-3 opacity-50"></i>
                <p className="mb-0 fs-5">
                  {fromDate || toDate || status || leadQualified
                    ? "No records found with selected filters"
                    : "No pending records"}
                </p>
              </div>
            ) : (
              <Table hover responsive bordered className="mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Planned Date</th>
                    <th>Firm Name</th>
                    <th>Contact</th>
                    <th>Locality</th>
                    <th>Is Lead Qualified</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                      <td>{formatDate(r.plannedDate)}</td>
                      <td className="fw-medium">{r.colB}</td>
                      <td>{r.colC || "-"}</td>
                      <td>{r.colD}</td>
                      <td>{r.colK || "-"}</td>
                      <td className="text-center">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="d-flex align-items-center gap-1 mx-auto"
                          onClick={() =>
                            setSelectedRow({
                              ...r,
                              rowIndex: r.rowIndex,
                            })
                          }
                        >
                          <i className="bi bi-pencil-square"></i>
                          Action
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>

        {/* Action Modal */}
        {selectedRow && (
          <ActionModal
            row={selectedRow}
            onClose={() => setSelectedRow(null)}
            onSuccess={() => refetch()} // Refresh data after modal success
          />
        )}
      </div>
    </Layout>
  );
}

export default CallToBroker;
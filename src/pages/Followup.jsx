import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFollowupData } from "../services/fmsApi";
import FollowupModal from "../modals/FollowupModal";
import { Button, Table, Form } from "react-bootstrap";
import Layout from "../components/Layout";
import SkeletonTable from "../components/SkeletonTable";

function Followup() {
  // Filter states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");

  // Modal state
  const [selectedRow, setSelectedRow] = useState(null);

  // TanStack Query: fetches and caches data
  const {
    data: rows = [],       // Default to empty array if no data
    isLoading,
    refetch,               // To refresh after modal success
  } = useQuery({
    queryKey: ["followup", fromDate, toDate, status],
    queryFn: () => fetchFollowupData({
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      status: status || undefined,
    }),
    select: (res) => res?.data || [],
    staleTime: 1000 * 60 * 5,
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
  };

  const handleClearFilter = () => {
    setFromDate("");
    setToDate("");
    setStatus("");
  };

  // Format date for display (safe handling)
  const formatDate = (dateVal) => {
    if (!dateVal || dateVal === "-") return "-";
    const date = new Date(dateVal);
    if (isNaN(date.getTime())) return dateVal.toString();
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
        { name: "Followup", path: "/process/followup" }
      ]}
    >
      <div className="container my-5">
        <div className="card shadow-sm border-0 overflow-hidden">
          {/* Header */}
          <div className="card-header bg-primary text-white py-4 text-center">
            <h3 className="mb-0 fw-bold d-flex align-items-center justify-content-center gap-3">
              <i className="bi bi-chat-dots fs-2"></i>
              Followup
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

              <div className="col-md-5 d-flex gap-2">
                <Button
                  variant="primary"
                  onClick={handleApplyFilter}
                  disabled={isLoading}
                >
                  <i className="bi bi-funnel me-2"></i>
                  Apply Filter
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={handleClearFilter}
                  disabled={isLoading}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Clear All
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
                  {fromDate || toDate || status
                    ? "No records found with selected filters"
                    : "No pending records"}
                </p>
              </div>
            ) : (
              <>
                <Table hover responsive bordered className="mb-0 align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Planned Date</th>
                      <th>Firm Name</th>
                      <th>Contact</th>
                      <th>Locality</th>
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

                {/* Added row count */}
                <div className="mt-3 text-muted small text-end pe-2">
                  Showing <strong>{rows.length}</strong> record
                  {rows.length !== 1 ? "s" : ""}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Modal */}
        {selectedRow && (
          <FollowupModal
            row={selectedRow}
            onClose={() => setSelectedRow(null)}
            onSuccess={() => refetch()}
          />
        )}
      </div>
    </Layout>
  );
}

export default Followup;
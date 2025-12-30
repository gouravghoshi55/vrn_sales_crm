import { useEffect, useState } from "react";
import { fetchFollowupData } from "../services/fmsApi";
import FollowupModal from "./FollowupModal"; // Update this modal file next
import { Button, Table, Form } from "react-bootstrap";
import Layout from "./Layout";
import SkeletonTable from "../components/SkeletonTable";

function Followup() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState(""); // Status filter on column I

  const loadData = async (filters = {}) => {
    setLoading(true);
    const res = await fetchFollowupData(filters);
    if (res.success) {
      setRows(res.data);
    }
    setLoading(false);
  };

  // Initial load (no filter)
  useEffect(() => {
    loadData();
  }, []);

  const handleApplyFilter = () => {
    // Validate dates if provided
    if ((fromDate || toDate) && (!fromDate || !toDate)) {
      alert("Please select both From and To dates");
      return;
    }
    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      alert("From Date cannot be after To Date");
      return;
    }

    loadData({
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      status: status || undefined,
    });
  };

  const handleClearFilter = () => {
    setFromDate("");
    setToDate("");
    setStatus("");
    loadData(); // Reload all data
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

          {/* Filter Bar - Date + Status */}
          <div className="card-body pt-4 px-4 border-bottom">
            <Form className="row g-3 align-items-end">
              {/* From Date */}
              <div className="col-md-2">
                <Form.Label className="fw-medium">From Date</Form.Label>
                <Form.Control
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              {/* To Date */}
              <div className="col-md-2">
                <Form.Label className="fw-medium">To Date</Form.Label>
                <Form.Control
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div className="col-md-3">
                <Form.Label className="fw-medium">Status</Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Call Again">Call Again</option>
                  <option value="Agreed to next meeting">Agreed to next meeting</option>
                  <option value="Not interested">Not interested</option>
                </Form.Select>
              </div>

              {/* Buttons */}
              <div className="col-md-5 d-flex gap-2">
                <Button
                  variant="primary"
                  onClick={handleApplyFilter}
                  disabled={loading}
                >
                  <i className="bi bi-funnel me-2"></i>
                  Apply Filter
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={handleClearFilter}
                  disabled={loading}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Clear All
                </Button>
              </div>
            </Form>
          </div>

          {/* Table Body */}
          <div className="card-body p-0 px-4 pb-4">
            {loading ? (
              <SkeletonTable rowsCount={6} />
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
              <Table hover responsive bordered className="mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Firm Name</th>
                    <th>Contact</th>
                    <th>Locality</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
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
            )}
          </div>
        </div>

        {/* Action Modal */}
        {selectedRow && (
          <FollowupModal
            row={selectedRow}
            onClose={() => setSelectedRow(null)}
            onSuccess={loadData}
          />
        )}
      </div>
    </Layout>
  );
}

export default Followup;
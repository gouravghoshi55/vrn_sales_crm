import { useState } from "react";
import { submitFollowupAction } from "../services/fmsApi"; // Updated import
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

function FollowupModal({ row, onClose, onSuccess }) {
  const [status, setStatus] = useState(row.colI || "");
  const [contactPerson, setContactPerson] = useState(row.colJ || "");
  const [rera, setRera] = useState(row.colK || "");
  const [remark, setRemark] = useState(row.colL || "");
  const [days, setDays] = useState(row.colM || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!status) {
      toast.warning("Please select a status");
      return;
    }

    setSaving(true);

    const payload = {
      rowNumber: row.rowNumber,
      status,
      contactPerson,
      rera,
      remark,
      days: status === "Agreed to next meeting" ? days : "",
    };

    const res = await submitFollowupAction(payload);

    setSaving(false);

    if (res.success) {
      toast.success("Follow-up updated successfully");
      onClose();
      onSuccess();
    } else {
      toast.error("Failed to update. Please try again.");
    }
  };

  return (
    <Modal show onHide={onClose} centered size="lg" backdrop="static">
      <Modal.Header closeButton className="border-0 pb-1">
  <div>
    <Modal.Title className="fw-bold d-flex align-items-center gap-2">
      <i className="bi bi-chat-dots text-primary fs-4"></i>  {/* changed icon to match Followup */}
      Follow-up Action
    </Modal.Title>
    <div className="text-muted small mt-1">
      Firm: <strong>{row.colB || "—"}</strong>
      {row.colC && ` • Contact: ${row.colC}`}
    </div>
  </div>
</Modal.Header>

      <Modal.Body className="pt-4">
        <Form>
          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">
              <i className="bi bi-tag-fill me-2 text-primary"></i>
              Status <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              size="lg"
            >
              <option value="">Select status...</option>
              <option value="Call Again">Call Again</option>
              <option value="Agreed to next meeting">Agreed to next meeting</option>
              <option value="Not interested">Not interested</option>
            </Form.Select>
          </Form.Group>

          {/* Contact Person Name */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">
              <i className="bi bi-person-fill me-2 text-primary"></i>
              Contact Person Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              size="lg"
            />
          </Form.Group>

          {/* RERA */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">
              <i className="bi bi-card-checklist me-2 text-primary"></i>
              RERA Registered
            </Form.Label>
            <Form.Select
              value={rera}
              onChange={(e) => setRera(e.target.value)}
              size="lg"
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>

          {/* Remark */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">
              <i className="bi bi-chat-square-text-fill me-2 text-primary"></i>
              Remark
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Add remarks or notes..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              size="lg"
            />
          </Form.Group>

          {/* Conditional Date for the Meeting */}
          <div
            className={`transition-all ${
              status === "Agreed to next meeting" ? "opacity-100 max-h-200" : "opacity-0 max-h-0"
            } overflow-hidden`}
            style={{ transition: "all 0.4s ease" }}
          >
            {status === "Agreed to next meeting" && (
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  <i className="bi bi-calendar-event me-2 text-primary"></i>
                  Date for the Meeting
                </Form.Label>
                <Form.Control
                  type="date"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  size="lg"
                />
              </Form.Group>
            )}
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-3">
        <Button variant="secondary" onClick={onClose} size="lg">
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={handleSubmit}
          disabled={saving}
          size="lg"
          className="d-flex align-items-center gap-2 px-4"
        >
          {saving ? (
            <>
              <Spinner animation="border" size="sm" />
              Saving...
            </>
          ) : (
            <>
              <i className="bi bi-check2"></i>
              Save
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FollowupModal;
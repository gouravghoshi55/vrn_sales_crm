import { useState } from "react";
import { submitMeetingsAction } from "../services/fmsApi"; // Updated import
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

function MeetingsModal({ row, onClose, onSuccess }) {
  const [status, setStatus] = useState(row.colT || "");
  const [remark, setRemark] = useState(row.colU || "");
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
      remark,
    };

    const res = await submitMeetingsAction(payload);

    setSaving(false);

    if (res.success) {
      toast.success("Status updated successfully");
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
      <i className="bi bi-people-fill text-primary fs-4"></i>
      Meetings Update
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
              <option value="Done">Done</option>
              <option value="Not done">Not done</option>
            </Form.Select>
          </Form.Group>

          {/* Remarks */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">
              <i className="bi bi-chat-square-text-fill me-2 text-primary"></i>
              Remarks
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Add any remarks or meeting notes..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              size="lg"
            />
          </Form.Group>
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

export default MeetingsModal;
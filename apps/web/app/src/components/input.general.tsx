import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  classes?: string;
}

export const TextInput: React.FC<InputProps> = ({ label, error, classes = "", ...props }) => (
  <div className={`form-group text-input ${classes}`}>
    {label && <label className="form-label">{label}</label>}
    <input className={`form-control ${error ? "is-invalid" : ""}`} {...props} />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);
import { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  classes?: string;
  rows?: number;
};

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  classes = "",
  rows = 3,
  ...props
}) => (
  <div className={`form-group text-area ${classes}`}>
    {label && <label className="form-label">{label}</label>}
    <textarea
      className={`form-control ${error ? "is-invalid" : ""}`}
      rows={rows}
      {...props}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export const CheckboxInput: React.FC<InputProps> = ({ label, error, classes = "", ...props }) => (
  <div className={`form-group form-check checkbox-input ${classes}`}>
    <input type="checkbox" className={`form-check-input ${error ? "is-invalid" : ""}`} {...props} />
    {label && <label className="form-check-label">{label}</label>}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export const DateInput: React.FC<InputProps> = ({ label, error, classes = "", ...props }) => (
  <div className={`form-group date-input ${classes}`}>
    {label && <label className="form-label">{label}</label>}
    <input type="date" className={`form-control ${error ? "is-invalid" : ""}`} {...props} />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export const FileInput: React.FC<InputProps> = ({ label, error, classes = "", ...props }) => (
  <div className={`form-group file-input ${classes}`}>
    {label && <label className="form-label">{label}</label>}
    <input type="file" className={`form-control ${error ? "is-invalid" : ""}`} {...props} />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default TextInput;
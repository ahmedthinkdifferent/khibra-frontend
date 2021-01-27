const Button = ({ label, doSubmit, className, error }) => (
  <a className={className} onClick={doSubmit} disabled="false">
    {label}
  </a>
);

export default Button;

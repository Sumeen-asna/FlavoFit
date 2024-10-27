interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function FormInput({ label, type, value, onChange, required = true }: FormInputProps) {
  return (
    <div>
      <label className="block text-black mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="input-field"
        required={required}
      />
    </div>
  );
}
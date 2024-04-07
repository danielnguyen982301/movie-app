import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

interface MultiCheckboxProps extends Record<string, any> {
  options: { name: string; id: string }[];
}

function FMultiCheckbox({ name, options, ...other }: MultiCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option: { name: string; id: string }) =>
          field.value.some(
            (value: { name: string; id: string }) => value.id === option.id
          )
            ? field.value.filter(
                (value: { name: string; id: string }) => value.id !== option.id
              )
            : [...field.value, option];

        return (
          <FormGroup>
            {options.map((option: { name: string; id: string }) => (
              <FormControlLabel
                key={option.name}
                control={
                  <Checkbox
                    checked={field.value.some(
                      (value: { name: string; id: string }) =>
                        value.id === option.id
                    )}
                    onChange={() => field.onChange(onSelected(option))}
                  />
                }
                label={option.name}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}

export default FMultiCheckbox;

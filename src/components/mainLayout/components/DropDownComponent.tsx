import { cn } from "@/utils/cn";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type OptionsType = {
  id: number | string;
  name: string;
};

interface SelectDropDownProps {
  options: OptionsType[] | undefined;
  placeholder?: string;
  label?: string;
  className?: string;
  value?: string; // Value of the selected option
  onChange?: (value: string) => void; // Function to call when the selected option changes
}

export default function DropDownComponent({
  options,
  placeholder,
  label,
  className,
  value,
  onChange,
}: SelectDropDownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "w-fit border-[#ADE7DE] bg-[#E7FDF9] font-medium",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {label && (
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options?.map((option) => (
              <SelectItem key={option.name} value={"" + option?.id}>
                {option?.name}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
        {!label &&
          options?.map((option) => (
            <SelectItem key={option?.name} value={"" + option?.id}>
              {option?.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}

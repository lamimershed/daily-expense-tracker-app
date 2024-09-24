import { cn } from "@/utils/cn";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  name?: string;
}

export default function DropDownComponent({
  options,
  placeholder,
  label,
  className,
  value,
  onChange,
  name,
}: SelectDropDownProps) {
  return (
    <Select
      value={value ? value : ""}
      defaultValue=""
      onValueChange={onChange}
      name={name}
    >
      <SelectTrigger
        className={cn(
          "h-[50px] w-full rounded-[12px] border-[#E4E4E4] bg-[#ffffff] px-[20px]",
          className,
        )}
      >
        <SelectValue
          placeholder={
            <>
              <p className="text-[16px] text-[#8897AD]">{placeholder}</p>
            </>
          }
        />
      </SelectTrigger>
      <SelectContent>
        {label && (
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options?.map((option) => (
              <SelectItem key={option.name} value={"" + option?.name}>
                {option?.name}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
        {!label &&
          options?.map((option) => (
            <SelectItem key={option?.name} value={"" + option?.name}>
              {option?.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}

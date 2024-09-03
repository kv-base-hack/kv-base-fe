import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const renderDuration = (duration: string) => {
  switch (duration) {
    case "4h":
      return {
        value: "4H",
      };
    case "1d": {
      return {
        value: "1D",
      };
    }
    case "3d": {
      return {
        value: "3D",
      };
    }
    case "7d": {
      return {
        value: "7D",
      };
    }
    case "30d": {
      return {
        value: "30D",
      };
    }
    default: {
      return {
        value: "1D",
      };
    }
  }
};

const OPTION_DURATION = {
  option1: [
    {
      value: "4h",
      label: "4H",
    },
    {
      value: "24h",
      label: "1D",
    },
    {
      value: "72h",
      label: "3D",
    },
    {
      value: "128h",
      label: "7D",
    },
  ],
  option2: [
    {
      value: "4h",
      label: "4H",
    },
    {
      value: "1d",
      label: "1D",
    },
    {
      value: "3d",
      label: "3D",
    },
    {
      value: "7d",
      label: "7D",
    },
    {
      value: "30d",
      label: "30D",
    },
  ],
  option3: [
    {
      value: "1d",
      label: "1D",
    },
    {
      value: "3d",
      label: "3D",
    },
    {
      value: "7d",
      label: "7D",
    },
    {
      value: "30d",
      label: "30D",
    },
  ],
};

export const SelectDurationLeaderboard = ({
  duration,
  setDuration,
  setPage,
  type = "option1",
}: {
  duration: string;
  setDuration: (duration: string) => void;
  setPage?: (val: number) => void;
  type?: "option1" | "option2" | "option3";
}) => {
  return (
    <Select
      value={duration}
      onValueChange={(val: string) => {
        setDuration(val);
        if (setPage) setPage(1);
      }}
    >
      <SelectTrigger
        area-label="select-date"
        className={cn(
          "flex h-7 w-auto cursor-pointer gap-1 whitespace-nowrap rounded-[360px] border border-solid border-[#656565] bg-neutral-07/50 text-sm font-medium tracking-normal text-neutral-100 backdrop-blur-[50px]",
        )}
      >
        <div className="grow">{renderDuration(duration).value}</div>
      </SelectTrigger>
      <SelectContent className="z-[9999] !min-w-16 border-none bg-neutral-07">
        {OPTION_DURATION[type].map(({ value, label }, index) => (
          <SelectItem key={index} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

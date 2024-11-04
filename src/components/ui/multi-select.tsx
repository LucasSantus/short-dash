import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { normalizeText } from "@/utils/normalize-text";
import { type VariantProps, cva } from "class-variance-authority";
import { CheckIcon, ChevronDown, LoaderIcon, XIcon } from "lucide-react";
import * as React from "react";
import { ScrollArea } from "./scroll-area";

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva("p-1.5 transition delay-150 duration-300 ease-in-out", {
  variants: {
    variant: {
      default: "border-foreground/10 bg-card text-foreground hover:bg-card/80",
      secondary: "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      inverted: "inverted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type MultiSelectOption = {
  /** The text to display for the option. */
  label: string;

  /** The unique value associated with the option. */
  value: string;

  /** Optional icon component to display alongside the option. */
  icon?: React.ComponentType<{ className?: string }>;
};

export type MultiSelectOptions = Array<MultiSelectOption>;

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: MultiSelectOptions;

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Selecione os Itens".
   */
  placeholder?: string;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to true.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;

  /**
   * If true, displays a loading state.
   * Optional, defaults to false.
   */
  isLoading?: boolean;

  /**
   * If true, allows multiple selections.
   * Optional, defaults to true.
   */
  multiple?: boolean;

  /**
   * If true, displays the "Selecionar todos" option.
   * Optional, defaults to true.
   */
  showSelectedAll?: boolean;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Selecione os Itens",
      maxCount = 2,
      modalPopover = true,
      asChild = false,
      className,
      isLoading,
      disabled,
      multiple = true,
      showSelectedAll = true,
      ...props
    },
    ref
  ) => {
    const [search, setSearch] = React.useState<string>("");
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        if (multiple) {
          const newSelectedValues = [...selectedValues];
          newSelectedValues.pop();
          setSelectedValues(newSelectedValues);
          onValueChange(newSelectedValues);
        }
      }
    };

    const toggleOption = (value: string) => {
      if (multiple) {
        const newSelectedValues = selectedValues.includes(value)
          ? selectedValues.filter((v) => v !== value)
          : [...selectedValues, value];
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      } else {
        setSelectedValues([value]);
        onValueChange([value]);
      }
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);

        const firstValue = [allValues[0] ?? ""];

        const values = multiple ? allValues : firstValue;

        setSelectedValues(values);
        onValueChange(values);
      }
    };

    const filteredOptions = React.useMemo(() => {
      return options.filter((option) => {
        return normalizeText(option.label).includes(normalizeText(search));
      });
    }, [options, search]);

    const isDisabled = isLoading || disabled;

    return (
      <Popover open={isPopoverOpen} modal={modalPopover} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            variant="ghost"
            onClick={handleTogglePopover}
            className={cn(
              "flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit p-1 hover:bg-inherit",
              className
            )}
            disabled={isDisabled}
          >
            {!isDisabled && selectedValues.length > 0 ? (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center space-x-1">
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;

                    if (!multiple) {
                      return (
                        <div key={value} className={multiSelectVariants({ variant, className: "text-start" })}>
                          {IconComponent && <IconComponent className="mr-2 size-4" />}

                          <div className="max-w-32 truncate">{option?.label}</div>
                        </div>
                      );
                    }

                    return (
                      <Badge key={value} className={multiSelectVariants({ variant })}>
                        {IconComponent && <IconComponent className="mr-2 size-4" />}

                        <span className="max-w-20 truncate">{option?.label}</span>

                        <XIcon
                          className="ml-2 h-4 w-4 shrink-0 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </Badge>
                    );
                  })}

                  {selectedValues.length > maxCount && (
                    <Badge
                      className={cn(
                        "border-foreground/1 bg-transparent text-foreground hover:bg-transparent",
                        multiSelectVariants({ variant })
                      )}
                    >
                      {`+ ${selectedValues.length - maxCount} Itens`}
                      <XIcon
                        className="ml-2 size-4 shrink-0 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  {multiple && (
                    <XIcon
                      className="mx-2 h-4 cursor-pointer text-muted-foreground"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClear();
                      }}
                    />
                  )}

                  <Separator orientation="vertical" className="flex h-full min-h-6" />

                  <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full items-center justify-between text-muted-foreground">
                <span className="mx-3 text-sm">{isLoading ? "Carregando..." : placeholder}</span>

                {isLoading ? (
                  <LoaderIcon className="pointer-events-none mx-2 size-4 animate-spin" />
                ) : (
                  <ChevronDown className="pointer-events-none mx-2 size-4" />
                )}
              </div>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-auto p-0">
          <Command shouldFilter={false}>
            <CommandInput
              value={search}
              disabled={isLoading}
              onValueChange={setSearch}
              placeholder="Pesquisar..."
              onKeyDown={handleInputKeyDown}
            />

            <CommandList>
              <ScrollArea className={cn("overflow-y-auto pr-2", options.length > 6 && "h-60")}>
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

                <CommandGroup>
                  {!search && showSelectedAll && (
                    <CommandItem disabled={isLoading} onSelect={toggleAll} className="cursor-pointer">
                      <div
                        className={cn(
                          "mr-2 flex size-4 items-center justify-center rounded-sm",
                          selectedValues.length === options.length
                            ? "bg-custom-blue-500 text-white"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className="size-4" />
                      </div>

                      <span className="font-medium">( Selecionar todos )</span>
                    </CommandItem>
                  )}

                  {filteredOptions.slice(0, 50).map((option) => {
                    const isSelected = selectedValues.includes(option.value);

                    return (
                      <CommandItem
                        key={option.value}
                        className="cursor-pointer"
                        onSelect={() => toggleOption(option.value)}
                      >
                        <div
                          className={cn(
                            "mr-2 flex size-4 items-center justify-center rounded-sm",
                            isSelected ? "bg-custom-blue-500 text-white" : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className="size-4" />
                        </div>

                        {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}

                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>

                <CommandSeparator alwaysRender />

                <CommandGroup>
                  <div className="flex items-center justify-between">
                    {selectedValues.length > 0 && (
                      <React.Fragment>
                        <CommandItem onSelect={handleClear} className="flex-1 cursor-pointer justify-center">
                          Limpar
                        </CommandItem>

                        <Separator orientation="vertical" className="flex h-full min-h-6" />
                      </React.Fragment>
                    )}

                    <CommandItem
                      onSelect={() => setIsPopoverOpen(false)}
                      className="max-w-full flex-1 cursor-pointer justify-center"
                    >
                      Fechar
                    </CommandItem>
                  </div>
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

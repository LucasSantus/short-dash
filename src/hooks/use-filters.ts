import { zodParseJsonPreprocessor } from "@/utils/zod-parse-json-preprocessor";
import type { NoInfer } from "@tanstack/react-query";
import { UseQueryStateOptions, useQueryState } from "nuqs";
import { AnyZodObject, z } from "zod";

export function useFilters<TSchema extends AnyZodObject, TValue extends z.infer<TSchema>>(
  schema: TSchema,
  defaultValue: NoInfer<TValue>,
  options?: Omit<UseQueryStateOptions<NoInfer<TValue>>, "defaultValue" | "parse" | "serialize">
) {
  const [filters, setFilters] = useQueryState<TValue>("filters", {
    defaultValue,
    parse(value) {
      return z.preprocess(zodParseJsonPreprocessor, schema).parse(value) as TValue;
    },
    serialize(value) {
      return JSON.stringify(value);
    },
    ...options,
  });

  return { filters, setFilters } as const;
}

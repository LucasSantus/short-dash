// import { AllCategoriesQueryResponse } from "@/graphql/queries/all-categories";
// import { QueryKeys } from "@/types/QueryKeys";
// import { useQueryClient } from "@tanstack/react-query";
// import { AllProductCategoryStatus } from "../_types/all-product-categories";
// import { CategorySchema } from "../table/form/link-form";

// export function useCategoryOnCache() {
//   const queryClient = useQueryClient();

//   const allCategoriesListCache =
//     queryClient.getQueriesData<AllCategoriesQueryResponse>({
//       queryKey: [QueryKeys.AllCategories],
//     });

//   function updateCategoryStatusOnCache({
//     categoryId,
//     newStatus,
//   }: {
//     categoryId: string;
//     newStatus: AllProductCategoryStatus;
//   }) {
//     allCategoriesListCache.forEach(([cacheKey, cacheData]) => {
//       if (!cacheData) {
//         return;
//       }

//       queryClient.setQueryData<AllCategoriesQueryResponse>(cacheKey, {
//         ...cacheData,
//         allProductCategories: {
//           ...cacheData.allProductCategories,
//           data: cacheData.allProductCategories.data.map((categoryOnCache) => {
//             if (categoryOnCache.id === categoryId)
//               return {
//                 ...categoryOnCache,
//                 status: newStatus,
//                 updatedAt: new Date(),
//               };

//             return categoryOnCache;
//           }),
//         },
//       });
//     });
//   }

//   function updateCategoryOnCache({
//     categoryId,
//     category,
//   }: {
//     categoryId: string;
//     category: CategorySchema;
//   }) {
//     allCategoriesListCache.forEach(([cacheKey, cacheData]) => {
//       if (!cacheData) {
//         return;
//       }

//       queryClient.setQueryData<AllCategoriesQueryResponse>(cacheKey, {
//         ...cacheData,
//         allProductCategories: {
//           ...cacheData.allProductCategories,
//           data: cacheData.allProductCategories.data.map((categoryOnCache) => {
//             if (categoryOnCache.id === categoryId)
//               return {
//                 ...categoryOnCache,
//                 name: category.name,
//                 updatedAt: new Date(),
//               };

//             return categoryOnCache;
//           }),
//         },
//       });
//     });
//   }

//   return {
//     updateCategoryStatusOnCache,
//     updateCategoryOnCache,
//   };
// }

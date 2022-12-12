import axiosInstance from "@/lib/axios";

export interface OptionValue {
  label: string;
  value: string;
}

export async function searchPart(
  search_part_no: string
): Promise<OptionValue[]> {
  // console.log("fetching part no", search_part_no);

  return await axiosInstance
    .get("/request/searchPart", { params: { part_no: search_part_no } })
    // .then((response) => response.json())
    .then((res) =>
      (res.data as { part_no: string }[]).map(({ part_no }) => ({
        label: part_no,
        value: part_no,
      }))
    );
}

export async function searchMachine(
  search_machine_no: string
): Promise<OptionValue[]> {
  // console.log("fetching machine no", search_machine_no);

  return await axiosInstance
    .get("/request/searchMachine", {
      params: { machine_no: search_machine_no },
    })
    // .then((response) => response.json())
    .then((res) =>
      (res.data as { machine_no: string }[]).map(({ machine_no }) => ({
        label: machine_no,
        value: machine_no,
      }))
    );
}

export async function searchProduct(
  search_product_name: string
): Promise<OptionValue[]> {
  return await axiosInstance
    .get("/request/searchProduct", {
      params: { product_name: search_product_name },
    })
    // .then((response) => response.json())
    .then((res) =>
      (res.data as { full_name: string }[]).map(({ full_name }) => ({
        label: full_name,
        value: full_name,
      }))
    );
}

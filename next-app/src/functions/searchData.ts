import axiosInstance from "@/lib/axios";

export interface OptionValue {
  label: string;
  value: string;
}

export async function searchPart(
  search_part_no: string
): Promise<OptionValue[]> {
  const data: { label: string; value: string }[] = await axiosInstance
    .get("/request/searchPart", { params: { part_no: search_part_no } })
    // .then((response) => response.json())
    .then((res) =>
      (res.data as { part_no: string }[]).map(({ part_no }) => ({
        label: part_no,
        value: part_no,
      }))
    );
  if (data.length !== 0) {
    return data;
  } else {
    const default_data: { label: string; value: string }[] = [
      {
        label: search_part_no,
        value: search_part_no,
      },
    ];
    return default_data;
  }
}

export async function searchMachine(
  search_machine_no: string
): Promise<OptionValue[]> {
  const data = await axiosInstance
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
  if (data.length !== 0) {
    return data;
  } else {
    const default_data: { label: string; value: string }[] = [
      {
        label: search_machine_no,
        value: search_machine_no,
      },
    ];
    return default_data;
  }
}

export async function searchProduct(
  search_product_name: string
): Promise<OptionValue[]> {
  const data = await axiosInstance
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
  if (data.length !== 0) {
    return data;
  } else {
    const default_data: { label: string; value: string }[] = [
      {
        label: search_product_name,
        value: search_product_name,
      },
    ];
    return default_data;
  }
}

export async function searchUser(
  search_user_name: string
): Promise<OptionValue[]> {
  const data = await axiosInstance
    .get("/request/searchUser", {
      params: { name: search_user_name },
    })
    // .then((response) => response.json())
    .then((res) =>
      (res.data as { full_name: string }[]).map(({ full_name }) => ({
        label: full_name,
        value: full_name,
      }))
    );
  if (data.length !== 0) {
    return data;
  } else {
    const default_data: { label: string; value: string }[] = [
      {
        label: search_user_name,
        value: search_user_name,
      },
    ];
    return default_data;
  }
}

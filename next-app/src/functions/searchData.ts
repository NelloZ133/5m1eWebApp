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

export async function filterProduct(
  filter_product_name: string
): Promise<OptionValue[]> {
  const data = await axiosInstance
    .get("/request/filterProduct", { params: { product_name: filter_product_name } })
    .then((res) =>
      (res.data as { product_name: string }[]).map(({ product_name }) => ({
        label: product_name,
        value: product_name,
      }))
    );
  if (data.length !== 0) {
    return data;
  } else {
    const default_data: { label: string; value: string }[] = [
      {
        label: filter_product_name,
        value: filter_product_name,
      },
    ];
    return default_data;
  }
}

export async function filterPart(
  filter_part_no: string
): Promise<OptionValue[]> {
  const data = await axiosInstance
    .get("/request/filterPart", { params: { part_no: filter_part_no } })
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
        label: filter_part_no,
        value: filter_part_no,
      },
    ];
    return default_data;
  }
}

export async function filterLine(
  filter_line_name: string
): Promise<OptionValue[]> {
  const data = await axiosInstance
    .get("/request/filterLine", { params: { line_name: filter_line_name } })
    .then((res) =>
      (res.data as { line_name: string }[]).map(({ line_name }) => ({
        label: line_name,
        value: line_name,
      }))
    );
  if (data.length !== 0) {
    return data;
  } else {
    const default_data: { label: string; value: string }[] = [
      {
        label: filter_line_name,
        value: filter_line_name,
      },
    ];
    return default_data;
  }
}

export async function filterProcess(
  filter_process_name: string
): Promise<OptionValue[]> {
  const data = await axiosInstance
    .get("/request/filterProcess", { params: { process_name: filter_process_name } })
    .then((res) =>
      (res.data as { process_name: string }[]).map(({ process_name }) => ({
        label: process_name,
        value: process_name,
      }))
    );
  if (data.length !== 0) {
    return data;
  } else {
    const default_data: { label: string; value: string }[] = [
      {
        label: filter_process_name,
        value: filter_process_name,
      },
    ];
    return default_data;
  }
}

export async function filterMachine(
  filter_machine_no: string
): Promise<OptionValue[]> {
  const data = await axiosInstance
    .get("/request/filterMachine", { params: { machine_no: filter_machine_no } })
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
        label: filter_machine_no,
        value: filter_machine_no,
      },
    ];
    return default_data;
  }
}
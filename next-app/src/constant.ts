import { ItemDetail, ListItem } from "./types/5m1e-setting.type";
import { _5M1ERequestSelect } from "./types/request.type";

export const FilterRequestType = ["All", "Problem", "Change"];
export const AvailableProblemCategory = [
  "Man",
  "Machine",
  "Method",
  "Material",
  "Measurement",
  "Environment",
];
export const AvailableChangeCategory = [
  "Man",
  "Machine",
  "Method",
  "Material",
  "Measurement",
  "Environment",
  "Other",
  "No change",
];
export const SubmitProblemActionName = "Submit problem";
export const SubmitChangePointActionName = "Submit change point";
export const RequestProblemName = "5M1E Problem Report";
export const RequestChangePointName = "5M1E Change Point Report";
export const FileUploadedKey = "Uploaded";
export const KPI_LIST = ["Safety", "Quality", "Cost", "Delivery"];

export const RequestProblemIdParamName = "requestProblemId";

export const PositionMapToPoint: Record<string, number> = {
  OP: 1,
  LL: 2,
  TL: 3,
  MGR: 4,
  FM: 5,
  FD: 6,
};

export const ItemDetailOther: ItemDetail = {
  item_detail_id: -1,
  item_detail: "Other",
  list_item_id: -1,
};
export const DefaultItemDetail: ItemDetail = {
  item_detail_id: -1,
  item_detail: "",
  list_item_id: -1,
};
export const DefaultListItem: ListItem = {
  request_process_id: -1,
  category: "",
  list_item_id: -1,
  list_item_name: "",
};
export const AvailableProblemListItem: ListItem[] = [
  {
    request_process_id: 1,
    category: "Man",
    list_item_id: 1,
    list_item_name: "เกิดอุบัติเหตุกับพนักงาน",
  },
  {
    request_process_id: 1,
    category: "Man",
    list_item_id: 2,
    list_item_name: "พนักงานไม่พอ ผลิตงานแบบปกติไม่ได้",
  },
  {
    request_process_id: 1,
    category: "Man",
    list_item_id: 3,
    list_item_name: "พนักงานไม่พอ ต้องหยุดการผลิต",
  },
  {
    request_process_id: 1,
    category: "Machine",
    list_item_id: 4,
    list_item_name: "เครื่องจักรเสีย ต้องหยุดการผลิต",
  },
  {
    request_process_id: 1,
    category: "Machine",
    list_item_id: 5,
    list_item_name: "Assembly Jig เสีย ผลิตงานไม่ได้",
  },
  {
    request_process_id: 1,
    category: "Machine",
    list_item_id: 6,
    list_item_name: "Die/Mold เสีย ผลิตงานไม่ได้",
  },
  {
    request_process_id: 1,
    category: "Machine",
    list_item_id: 7,
    list_item_name: "Tooling เสีย ใช้งานไม่ได้",
  },
  {
    request_process_id: 1,
    category: "Method",
    list_item_id: 8,
    list_item_name: "ผลิตงานด้วย Condition/Parameter เดิมไม่ได้",
  },
  {
    request_process_id: 1,
    category: "Material",
    list_item_id: 9,
    list_item_name: "Material/Part ที่ใช้ประกอบเสีย ผลิตงานไม่ได้",
  },
  {
    request_process_id: 1,
    category: "Material",
    list_item_id: 10,
    list_item_name: "Material/Part ผิด Spec.",
  },
  {
    request_process_id: 1,
    category: "Measurement",
    list_item_id: 11,
    list_item_name: "เครื่องมือวัดเสีย ใช้งานไม่ได้",
  },
  {
    request_process_id: 1,
    category: "Measurement",
    list_item_id: 12,
    list_item_name: "Master เสีย ใช้งานไม่ได้",
  },
  {
    request_process_id: 1,
    category: "Measurement",
    list_item_id: 13,
    list_item_name: "Pokayoke เสีย ใช้งานไม่ได้",
  },
  {
    request_process_id: 1,
    category: "Measurement",
    list_item_id: 14,
    list_item_name: "นำเครื่องมือวัดไปสอบเทียบ",
  },
  {
    request_process_id: 1,
    category: "Measurement",
    list_item_id: 15,
    list_item_name: "นำ Master ไปสอบเทียบ",
  },
  {
    request_process_id: 1,
    category: "Environment",
    list_item_id: 16,
    list_item_name: "เกิดไฟดับ",
  },
  {
    request_process_id: 1,
    category: "Environment",
    list_item_id: 17,
    list_item_name: "อุณหภูมิ/ความชื้นมากกว่าที่กำหนด ผลิตงานไม่ได้",
  },
  {
    request_process_id: 1,
    category: "Environment",
    list_item_id: 18,
    list_item_name: "โยกย้าย M/C",
  },
  {
    request_process_id: 1,
    category: "Environment",
    list_item_id: 19,
    list_item_name: "หยุดไลน์ เพื่อผลิตงาน Trial",
  },
];
export const AvailableChangeListItem: ListItem[] = [
  {
    request_process_id: 2,
    category: "Man",
    list_item_id: 20,
    list_item_name: "เพิ่มพนักงานใหม่",
  },
  {
    request_process_id: 2,
    category: "Man",
    list_item_id: 21,
    list_item_name: "เปลี่ยนพนักงานแทนชั่วคราว",
  },
  {
    request_process_id: 2,
    category: "Machine",
    list_item_id: 22,
    list_item_name: "มีการทำ Overhaul/PM เครื่องจักร",
  },
  {
    request_process_id: 2,
    category: "Machine",
    list_item_id: 23,
    list_item_name: "มีการซ่อมเครื่องจักร (Repair/Fixing)",
  },
  {
    request_process_id: 2,
    category: "Machine",
    list_item_id: 24,
    list_item_name: "ใช้ Jig ทำใหม่ (Spec. เดิม)",
  },
  {
    request_process_id: 2,
    category: "Machine",
    list_item_id: 25,
    list_item_name: "ใช้ Jig หลังซ่อม/แก้ไขมา",
  },
  {
    request_process_id: 2,
    category: "Machine",
    list_item_id: 26,
    list_item_name: "ใช้ Die/Mold ทำใหม่ (Spec. เดิม)",
  },
  {
    request_process_id: 2,
    category: "Machine",
    list_item_id: 27,
    list_item_name: "ใช้ Die/Mold หลังซ่อม/แก้ไขมา",
  },
  {
    request_process_id: 2,
    category: "Machine",
    list_item_id: 28,
    list_item_name: "ใช้ Tooling ทำใหม่ (Spec. เดิม)",
  },
  {
    request_process_id: 2,
    category: "Machine",
    list_item_id: 29,
    list_item_name: "ใช้ Tooling หลังซ่อม/แก้ไขมา",
  },
  {
    request_process_id: 2,
    category: "Method",
    list_item_id: 30,
    list_item_name: "เปลี่ยนแปลงวิธีการทำงาน (ชั่วคราว)",
  },
  {
    request_process_id: 2,
    category: "Method",
    list_item_id: 31,
    list_item_name: "เปลี่ยนแปลงวิธีการทำงานใหม่ ตามที่ PCS กำหนด",
  },
  {
    request_process_id: 2,
    category: "Material",
    list_item_id: 32,
    list_item_name: "Material มีการเปลี่ยนแปลง",
  },
  {
    request_process_id: 2,
    category: "Material",
    list_item_id: 33,
    list_item_name: "Part/Subpart มีการเปลี่ยนแปลง",
  },
  {
    request_process_id: 2,
    category: "Material",
    list_item_id: 34,
    list_item_name:
      "ใช้ Material/Part/Subpart ที่มีการยอมรับพิเศษ (Special use)",
  },
  {
    request_process_id: 2,
    category: "Measurement",
    list_item_id: 35,
    list_item_name: "เปลี่ยนแปลงประเภท/หมายเลขของเครื่องมือวัด",
  },
  {
    request_process_id: 2,
    category: "Measurement",
    list_item_id: 36,
    list_item_name: "เปลี่ยนแปลง Master OK/NG",
  },
  {
    request_process_id: 2,
    category: "Measurement",
    list_item_id: 37,
    list_item_name: "ใช้เครื่องมือวัด/Master หลังสอบเทียบ",
  },
  {
    request_process_id: 2,
    category: "Environment",
    list_item_id: 38,
    list_item_name: "เกิดไฟดับ",
  },
  {
    request_process_id: 2,
    category: "Environment",
    list_item_id: 39,
    list_item_name: "มีการโยกย้าย M/C",
  },
  {
    request_process_id: 2,
    category: "Environment",
    list_item_id: 40,
    list_item_name: "มีการทดลองกระบวนการ",
  },
  {
    request_process_id: 2,
    category: "Other",
    list_item_id: 41,
    list_item_name: "อื่นๆ นอกเหนือจากที่ระบุไว้ข้างต้น",
  },
];

export const AvailableItemDetail: ItemDetail[] = [
  { item_detail_id: 1, item_detail: "พนักงานบาดเจ็บที่แขน", list_item_id: 1 },
  { item_detail_id: 2, item_detail: "พนักงานบาดเจ็บที่ขา", list_item_id: 1 },
  { item_detail_id: 3, item_detail: "พนักงานบาดเจ็บที่หัว", list_item_id: 1 },
  { item_detail_id: 4, item_detail: "พนักงานขาด 1 คน", list_item_id: 2 },
  { item_detail_id: 5, item_detail: "พนักงานขาด 2 คน", list_item_id: 2 },
  { item_detail_id: 6, item_detail: "พนักงานขาด 3 คน", list_item_id: 2 },
  { item_detail_id: 7, item_detail: "พนักงานขาดมากกว่า 3 คน", list_item_id: 3 },
  {
    item_detail_id: 8,
    item_detail: "พนักงาน Critical Process ไม่พอ",
    list_item_id: 3,
  },
  { item_detail_id: 9, item_detail: "Robot ไม่ทำงาน", list_item_id: 4 },
  { item_detail_id: 10, item_detail: "กระบอกสูบไม่ทำงาน", list_item_id: 4 },
  {
    item_detail_id: 11,
    item_detail: "เครื่องไม่ Weld/Weld ไม่ติด",
    list_item_id: 4,
  },
  {
    item_detail_id: 12,
    item_detail: "Scanner ไม่อ่าน Tag Kanban",
    list_item_id: 4,
  },
  {
    item_detail_id: 13,
    item_detail: "Jig สึก, แตก, หัก, บิ่น",
    list_item_id: 5,
  },
  {
    item_detail_id: 14,
    item_detail: "Die/Mold สึก, แตก, หัก, บิ่น",
    list_item_id: 6,
  },
  { item_detail_id: 15, item_detail: "Electrode เสียหาย", list_item_id: 7 },
  { item_detail_id: 16, item_detail: "มีดกลึงเสียหาย", list_item_id: 7 },
  { item_detail_id: 17, item_detail: "Punch เสียหาย", list_item_id: 7 },
  {
    item_detail_id: 18,
    item_detail: "Pokayoke Sensor ไม่ทำงาน",
    list_item_id: 7,
  },
  {
    item_detail_id: 19,
    item_detail: "Safety Sensor ไม่ทำงาน",
    list_item_id: 7,
  },
  {
    item_detail_id: 20,
    item_detail: "Sensor นับจำนวน Defect ไม่ทำงาน",
    list_item_id: 7,
  },
  {
    item_detail_id: 21,
    item_detail: "Condition/Parameter เปลี่ยนไปหลังทำ PM",
    list_item_id: 8,
  },
  {
    item_detail_id: 22,
    item_detail: "Material/Part มี Defect",
    list_item_id: 9,
  },
  { item_detail_id: 23, item_detail: "สีผิด Spec.", list_item_id: 10 },
  {
    item_detail_id: 24,
    item_detail: "สัญลักษณ์บน Material/Part ผิด Spec.",
    list_item_id: 10,
  },
  {
    item_detail_id: 25,
    item_detail: "Material/Part ผิดรุ่น",
    list_item_id: 10,
  },
  { item_detail_id: 26, item_detail: "Probe เสีย", list_item_id: 11 },
  { item_detail_id: 27, item_detail: "Thermometer เสีย", list_item_id: 11 },
  { item_detail_id: 28, item_detail: "Torque Wrench เสีย", list_item_id: 11 },
  { item_detail_id: 29, item_detail: "Vernier เสีย", list_item_id: 11 },
  { item_detail_id: 30, item_detail: "Master OK/NG เสีย", list_item_id: 12 },
  {
    item_detail_id: 31,
    item_detail: "Pokayoke จับงานเสียไม่ได้",
    list_item_id: 13,
  },
  {
    item_detail_id: 32,
    item_detail: "Pokayoke Alarm ตลอดเวลา",
    list_item_id: 13,
  },
  {
    item_detail_id: 33,
    item_detail: "นำ Thermometer ไปสอบเทียบ",
    list_item_id: 14,
  },
  {
    item_detail_id: 34,
    item_detail: "นำ Torque Wrench ไปสอบเทียบ",
    list_item_id: 14,
  },
  {
    item_detail_id: 35,
    item_detail: "นำ Vernier ไปสอบเทียบ",
    list_item_id: 14,
  },
  {
    item_detail_id: 36,
    item_detail: "นำ Master OK/NG ไปสอบเทียบ",
    list_item_id: 15,
  },
  { item_detail_id: 37, item_detail: "เกิดไฟดับตอนกะเช้า", list_item_id: 16 },
  { item_detail_id: 38, item_detail: "เกิดไฟดับตอนกะดึก", list_item_id: 16 },
  {
    item_detail_id: 39,
    item_detail: "อุณหภูมิ/ความชื้นเกินกว่าที่กำหนด",
    list_item_id: 17,
  },
  { item_detail_id: 40, item_detail: "สลับตำแหน่งภายในไลน์", list_item_id: 18 },
  { item_detail_id: 41, item_detail: "ย้ายไปนอกไลน์", list_item_id: 18 },
  {
    item_detail_id: 42,
    item_detail: "หยุดไลน์ เพื่อ Trial งาน New Model",
    list_item_id: 19,
  },
  {
    item_detail_id: 43,
    item_detail: "หยุดไลน์ เพื่อ Trial งาน PCR",
    list_item_id: 19,
  },
  {
    item_detail_id: 44,
    item_detail: "หยุดไลน์ เพื่อ Trial งาน Improvement",
    list_item_id: 19,
  },
  {
    item_detail_id: 45,
    item_detail: "เพิ่มพนักงานใหม่ 1 คน",
    list_item_id: 20,
  },
  {
    item_detail_id: 46,
    item_detail: "เพิ่มพนักงานใหม่ 2 คน",
    list_item_id: 20,
  },
  {
    item_detail_id: 47,
    item_detail: "เปลี่ยนพนักงานที่ไม่เคยมี Skill",
    list_item_id: 21,
  },
  {
    item_detail_id: 48,
    item_detail: "เปลี่ยนพนักงานที่มี Skill อยู่แล้ว",
    list_item_id: 21,
  },
  {
    item_detail_id: 49,
    item_detail: "เปลี่ยนพนักงาน Critical Process",
    list_item_id: 21,
  },
  {
    item_detail_id: 50,
    item_detail: "ทำ Overhaul/PM ตามแผนที่กำหนดไว้",
    list_item_id: 22,
  },
  {
    item_detail_id: 51,
    item_detail: "ทำ Overhaul/PM ฉุกเฉิน",
    list_item_id: 22,
  },
  {
    item_detail_id: 52,
    item_detail: "ซ่อมเครื่อง Injection",
    list_item_id: 23,
  },
  { item_detail_id: 53, item_detail: "ซ่อมเครื่อง Press", list_item_id: 23 },
  { item_detail_id: 54, item_detail: "ซ่อมเครื่อง Welding", list_item_id: 23 },
  { item_detail_id: 55, item_detail: "Jig Assembly", list_item_id: 24 },
  { item_detail_id: 56, item_detail: "Jig Support", list_item_id: 24 },
  { item_detail_id: 57, item_detail: "Jig Assembly", list_item_id: 25 },
  { item_detail_id: 58, item_detail: "Jig Support", list_item_id: 25 },
  { item_detail_id: 59, item_detail: "Cutting Die/Mold", list_item_id: 26 },
  { item_detail_id: 60, item_detail: "Injection Die/Mold", list_item_id: 26 },
  { item_detail_id: 61, item_detail: "Cutting Die/Mold", list_item_id: 27 },
  { item_detail_id: 62, item_detail: "Injection Die/Mold", list_item_id: 27 },
  { item_detail_id: 63, item_detail: "Camera", list_item_id: 28 },
  { item_detail_id: 64, item_detail: "Cutting Tool", list_item_id: 28 },
  { item_detail_id: 65, item_detail: "Electrode", list_item_id: 28 },
  { item_detail_id: 66, item_detail: "Sensor", list_item_id: 28 },
  { item_detail_id: 67, item_detail: "Camera", list_item_id: 29 },
  { item_detail_id: 68, item_detail: "Cutting Tool", list_item_id: 29 },
  { item_detail_id: 69, item_detail: "Electrode", list_item_id: 29 },
  { item_detail_id: 70, item_detail: "Sensor", list_item_id: 29 },
  {
    item_detail_id: 71,
    item_detail: "ปรับ condition/parameter เครื่องจักรชั่วคราว",
    list_item_id: 30,
  },
  {
    item_detail_id: 72,
    item_detail: "ปรับวิธีการทำงานชั่วคราว",
    list_item_id: 30,
  },
  {
    item_detail_id: 73,
    item_detail: "ปรับ condition/parameter เครื่องจักรตาม Process Window",
    list_item_id: 31,
  },
  { item_detail_id: 74, item_detail: "แก้ไขเอกสาร PCS", list_item_id: 31 },
  { item_detail_id: 75, item_detail: "แก้ไขเอกสาร OMS/CP", list_item_id: 31 },
  {
    item_detail_id: 76,
    item_detail: "เปลี่ยน Spec. ของ Material",
    list_item_id: 32,
  },
  {
    item_detail_id: 77,
    item_detail: "เปลี่ยน Part No. ของ Material",
    list_item_id: 32,
  },
  {
    item_detail_id: 78,
    item_detail: "เปลี่ยนแหล่งที่มา (Sourcing) ของ Material",
    list_item_id: 32,
  },
  {
    item_detail_id: 79,
    item_detail: "เปลี่ยน Spec. ของ Part/Subpart",
    list_item_id: 33,
  },
  {
    item_detail_id: 80,
    item_detail: "เปลี่ยน Part No. ของ Part/Subpart",
    list_item_id: 33,
  },
  {
    item_detail_id: 81,
    item_detail: "เปลี่ยนแหล่งที่มา (Sourcing) ของ Part/Subpart",
    list_item_id: 33,
  },
  {
    item_detail_id: 82,
    item_detail: "ใช้ Material ที่มีการยอมรับพิเศษ (Special use)",
    list_item_id: 34,
  },
  {
    item_detail_id: 83,
    item_detail: "ใช้ Part/Subpart ที่มีการยอมรับพิเศษ (Special use)",
    list_item_id: 34,
  },
  {
    item_detail_id: 84,
    item_detail: "เปลี่ยนจาก Analog เป็น Digital",
    list_item_id: 35,
  },
  {
    item_detail_id: 85,
    item_detail: "เปลี่ยนหมายเลขของเครื่องมือวัด",
    list_item_id: 35,
  },
  { item_detail_id: 86, item_detail: "เพิ่ม Master OK/NG", list_item_id: 36 },
  {
    item_detail_id: 87,
    item_detail: "ลด/ยกเลิกใช้ Master OK/NG",
    list_item_id: 36,
  },
  {
    item_detail_id: 88,
    item_detail: "ใช้เครื่องมือวัดหลังสอบเทียบ",
    list_item_id: 37,
  },
  {
    item_detail_id: 89,
    item_detail: "ใช้ Master OK/NG หลังสอบเทียบ",
    list_item_id: 37,
  },
  { item_detail_id: 90, item_detail: "กลับมาทำงานหลังไฟดับ", list_item_id: 38 },
  {
    item_detail_id: 91,
    item_detail: "เปิดใช้งานเครื่องจักรหลังจากย้าย",
    list_item_id: 39,
  },
  {
    item_detail_id: 92,
    item_detail: "กลับมาผลิตปกติ หลังผลิตงาน Trial",
    list_item_id: 40,
  },
];

export const DefaultRequestProblemItem: _5M1ERequestSelect = {
  request_no: "Create without problem request",
  request_id: "-1",
};

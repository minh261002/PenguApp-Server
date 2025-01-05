export const ErrorSchema = {
  type: "object",
  properties: {
    code: { type: "number", description: "Mã trạng thái HTTP" },
    message: { type: "string", description: "Mô tả lỗi" },
    details: { 
      type: "array", 
      items: { type: "string" }, 
      description: "Chi tiết lỗi bổ sung (nếu có)" 
    },
  },
  required: ["code", "message"],
};

export const ValidationErrorSchema = {
  type: "object",
  properties: {
    code: { type: "number", description: "Mã trạng thái HTTP cho lỗi xác thực" },
    message: { type: "string", description: "Thông báo lỗi xác thực" },
    fields: { 
      type: "object", 
      additionalProperties: { type: "string" }, 
      description: "Danh sách các trường không hợp lệ và lỗi tương ứng"
    },
  },
  required: ["code", "message", "fields"],
};

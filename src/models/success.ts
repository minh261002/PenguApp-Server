export const SuccessSchema = {
  type: "object",
  properties: {
    code: { type: "number", description: "Mã trạng thái HTTP" },
    message: { type: "string", description: "Thông báo thành công" },
    data: { 
      type: "object", 
      additionalProperties: true, 
      description: "Dữ liệu trả về trong trường hợp thành công" 
    },
  },
  required: ["code", "message"],
};

export const PaginationSuccessSchema = {
  type: "object",
  properties: {
    code: { type: "number", description: "Mã trạng thái HTTP" },
    message: { type: "string", description: "Thông báo thành công" },
    data: { 
      type: "array", 
      items: { type: "object", additionalProperties: true },
      description: "Danh sách dữ liệu phân trang" 
    },
    pagination: {
      type: "object",
      properties: {
        total: { type: "number", description: "Tổng số mục" },
        page: { type: "number", description: "Trang hiện tại" },
        limit: { type: "number", description: "Số mục mỗi trang" },
      },
      required: ["total", "page", "limit"],
    },
  },
  required: ["code", "message", "data", "pagination"],
};

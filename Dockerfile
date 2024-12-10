# Sử dụng image Node.js phiên bản nhẹ
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Chỉ cài đặt dependencies
RUN npm install --only=production

# Sao chép mã nguồn
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Expose cổng 3015
EXPOSE 3015

# Lệnh chạy ứng dụng
CMD ["npm", "start"]

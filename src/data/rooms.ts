// Public room types displayed on website
export const publicRoomTypes = [
  {
    id: 'single-balcony',
    title: 'Phòng Đơn',
    name: 'Phòng đơn có ban công',
    nameEn: 'Single Room with Balcony',
    capacity: 'Cá nhân',
    amenities: ['Giường đơn', 'Ban công', 'Nước nóng'],
    priceHourly: 120000,
    priceDay: 450000,
    image: 'https://via.placeholder.com/400x300?text=Single+with+Balcony'
  },
  {
    id: 'single-no-balcony',
    title: 'Phòng Đơn',
    name: 'Phòng đơn không ban công',
    nameEn: 'Single Room without Balcony',
    capacity: 'Cá nhân',
    amenities: ['Giường đơn', 'Nước nóng'],
    priceHourly: 120000,
    priceDay: 400000,
    image: 'https://via.placeholder.com/400x300?text=Single+without+Balcony'
  },
  {
    id: 'double-balcony',
    title: 'Phòng Đôi',
    name: 'Phòng đôi có ban công',
    nameEn: 'Double Room with Balcony',
    capacity: '1-2 người',
    amenities: ['Giường đôi', 'Ban công', 'Nước nóng'],
    priceHourly: 150000,
    priceDay: 650000,
    image: 'https://via.placeholder.com/400x300?text=Double+with+Balcony'
  },
  {
    id: 'double-balcony-bbq',
    title: 'Phòng Đôi',
    name: 'Phòng đôi có ban công và sân BBQ',
    nameEn: 'Double Room with Balcony & BBQ Yard',
    capacity: '1-2 người',
    amenities: ['Giường đôi', 'Ban công', 'Nước nóng', 'Sân BBQ'],
    priceHourly: 150000,
    priceDay: 550000,
    image: 'https://via.placeholder.com/400x300?text=Double+with+BBQ'
  }
];

// Internal room inventory - for reference only, NOT displayed on website
// Format: ROOM_NUMBER / ROOM_TYPE_LABEL / LOCATION
export const internalRoomList = [
  // B.101 / PHÒNG ĐÔI B / HẦM
  // B.102 / PHÒNG ĐÔI B / HẦM
  // P.201 / PHÒNG ĐƠN / TẦNG 1
  // B.202 / PHÒNG ĐÔI B / HẦM
  // B.201 / PHÒNG ĐÔI B / HẦM
  // P.304 / PHÒNG ĐƠN / TẦNG 2
  // P.303 / PHÒNG ĐƠN B / TẦNG 2
  // P.302 / PHÒNG ĐƠN B / TẦNG 2
  // P.301 / PHÒNG ĐƠN B / TẦNG 2
  // P.204 / PHÒNG ĐÔI / TẦNG 1
  // P.203 / PHÒNG ĐƠN B / TẦNG 1
  // P.202 / PHÒNG ĐÔI / TẦNG 1
  // P.102 / PHÒNG ĐÔI / TẦNG TRỆT
  // P.101 / PHÒNG ĐÔI / TẦNG TRỆT
];

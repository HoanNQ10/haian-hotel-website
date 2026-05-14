export type RoomSlide =
  | { type: 'gradient'; value: string }
  | { type: 'image'; src: string; alt: string };

export interface Room {
  number: string;
  typeName: string;
  description: string;
  bedType: string;
  capacity: string;
  floor: string;
  hasBalcony: boolean;
  slides: RoomSlide[];
}

export const rooms: Room[] = [
  // ── Phòng Đôi Có Ban Công ──────────────────────────────────
  {
    number: "202",
    typeName: "Phòng Đôi Có Ban Công",
    description: "Phòng rộng rãi với 2 giường đơn và ban công riêng — phù hợp cho nhóm bạn hoặc gia đình nhỏ. Ánh sáng tự nhiên tràn vào, thoáng mát quanh năm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng 1",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/20 to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-accent/30' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/10 to-border' },
    ],
  },
  {
    number: "204",
    typeName: "Phòng Đôi Có Ban Công",
    description: "Phòng rộng rãi với 2 giường đơn và ban công riêng — phù hợp cho nhóm bạn hoặc gia đình nhỏ. Ánh sáng tự nhiên tràn vào, thoáng mát quanh năm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng 1",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/20 to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-accent/30' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/10 to-border' },
    ],
  },
  {
    number: "B201",
    typeName: "Phòng Đôi Có Ban Công",
    description: "Phòng rộng rãi với 2 giường đơn và ban công riêng — phù hợp cho nhóm bạn hoặc gia đình nhỏ. Ánh sáng tự nhiên tràn vào, thoáng mát quanh năm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng hầm 2",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/20 to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-accent/30' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/10 to-border' },
    ],
  },
  {
    number: "B202",
    typeName: "Phòng Đôi Có Ban Công",
    description: "Phòng rộng rãi với 2 giường đơn và ban công riêng — phù hợp cho nhóm bạn hoặc gia đình nhỏ. Ánh sáng tự nhiên tràn vào, thoáng mát quanh năm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng hầm 2",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/20 to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-accent/30' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/10 to-border' },
    ],
  },
  // ── Phòng Đôi Không Ban Công ───────────────────────────────
  {
    number: "101",
    typeName: "Phòng Đôi Không Ban Công",
    description: "Phòng đôi tiêu chuẩn đầy đủ tiện nghi, yên tĩnh — lý tưởng cho gia đình nhỏ hoặc hai người bạn đồng hành muốn lưu trú tiết kiệm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng trệt",
    hasBalcony: false,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border/70 to-accent-soft/80' },
    ],
  },
  {
    number: "102",
    typeName: "Phòng Đôi Không Ban Công",
    description: "Phòng đôi tiêu chuẩn đầy đủ tiện nghi, yên tĩnh — lý tưởng cho gia đình nhỏ hoặc hai người bạn đồng hành muốn lưu trú tiết kiệm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng trệt",
    hasBalcony: false,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border/70 to-accent-soft/80' },
    ],
  },
  {
    number: "B101",
    typeName: "Phòng Đôi Không Ban Công",
    description: "Phòng đôi tiêu chuẩn đầy đủ tiện nghi, yên tĩnh — lý tưởng cho gia đình nhỏ hoặc hai người bạn đồng hành muốn lưu trú tiết kiệm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng hầm 1",
    hasBalcony: false,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border/70 to-accent-soft/80' },
    ],
  },
  // ── Phòng Đơn Có Ban Công ──────────────────────────────────
  {
    number: "201",
    typeName: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng — không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng 1",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft/80 to-accent/10' },
    ],
  },
  {
    number: "203",
    typeName: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng — không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng 1",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft/80 to-accent/10' },
    ],
  },
  {
    number: "301",
    typeName: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng — không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng 2",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft/80 to-accent/10' },
    ],
  },
  {
    number: "302",
    typeName: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng — không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng 2",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft/80 to-accent/10' },
    ],
  },
  {
    number: "303",
    typeName: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng — không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng 2",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft/80 to-accent/10' },
    ],
  },
  {
    number: "304",
    typeName: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng — không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng 2",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft/80 to-accent/10' },
    ],
  },
  // ── Phòng Đơn Không Ban Công ───────────────────────────────
  {
    number: "B102",
    typeName: "Phòng Đơn Không Ban Công",
    description: "Phòng đơn ấm cúng, sạch sẽ với đầy đủ tiện nghi cơ bản — lý tưởng cho lưu trú ngắn ngày với mức giá tiết kiệm.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng hầm 1",
    hasBalcony: false,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-primary/10 to-primary/20' },
      { type: 'gradient', value: 'bg-gradient-to-br from-primary/20 to-primary/10' },
      { type: 'gradient', value: 'bg-gradient-to-br from-primary/5 to-primary/15' },
    ],
  },
];

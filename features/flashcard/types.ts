export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  created_at: string; // hoặc Date, tùy theo bạn muốn parse dữ liệu thành Date hay để nguyên dạng string
  updated_at: string; // tương tự như trên
}

export interface Metadata {
  limit: number;
  total: number;
  page: number;
  total_pages: number;
}

export interface FlashcardResponse {
  data: Flashcard[];
  metadata: Metadata;
}

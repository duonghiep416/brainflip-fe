export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  created_at: string; // hoặc Date, tùy theo bạn muốn parse dữ liệu thành Date hay để nguyên dạng string
  isBookmarked?: boolean;
  updated_at: string; // tương tự như trên
  [key: string]: any;
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

export interface AddFlashcardsRequest {
  flashcards: Flashcard[];
  title: string;
  description?: string;
}

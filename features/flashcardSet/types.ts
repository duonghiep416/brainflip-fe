export interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  total: number;
}

export interface GetFlashcardSetResponseMetadata {
  limit: number;
  total: number;
  current_page: number;
  total_pages: number;
}

export interface GetFlashcardSetResponse {
  data: FlashcardSet[];
  metadata: GetFlashcardSetResponseMetadata;
}

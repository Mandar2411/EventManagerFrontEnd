export interface Event {
    id: number;
    title: string;
    description: string;
    img: string;
    cat_id: number;
    subcat_id: number;
    tag_ids: number[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Subcategory {
  id: number;
  name: string;
}
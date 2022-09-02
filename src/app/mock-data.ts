import { Category, Event, Subcategory, Tag } from './interface';

export const EVENTS: Event[] = [
  // { id: 1, title: 'Masterclass by Ankush Singla', img: 'https://files.codingninjas.in/artboard-1-copy-2x-2-17683.png', cat_id: 2, subcat_id: 1, tag_ids:[2,3] },
  // { id: 2, title: 'Ninjas Career Camp Freshers Java', img: 'https://files.codingninjas.in/cc_march-1-03-17099.png', cat_id: 2, subcat_id: 2, tag_ids:[5,3] },
  // { id: 3, title: 'Innovate India Coding Championship', img: 'https://files.codingninjas.in/iicc-final-creative-1-02-17602.png', cat_id: 3, subcat_id: 1, tag_ids:[1,3,5] }
];

export const TAGS: Tag[] = [
  { id: 1, name: 'Placement Preparation' },
  { id: 2, name: 'Contest' },
  { id: 3, name: 'Resume' },
  { id: 4, name: 'Android' },
  { id: 5, name: 'Web Development' },
  { id: 6, name: 'Blockchain' },
];

export const CATS: Category[] = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Webinar' },
  { id: 3, name: 'Contest' },
  { id: 4, name: 'Bootcamp' },
  { id: 5, name: 'Workshop' }
];

export const SUBCATS: Subcategory[] = [
  { id: 1, name: 'Upcoming' },
  { id: 2, name: 'Archived' }
];
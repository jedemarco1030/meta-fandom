export interface BookAuthor {
  author: {
    key: string;
  };
  type: {
    key: string;
  };
}

export interface BookCreated {
  type: string;
  value: string;
}

export interface BookLastModified {
  type: string;
  value: string;
}

export interface Book {
  author_alternative_name: string[];
  author_key: string[];
  author_name: string[];
  contributor: string[];
  cover_edition_key: string;
  cover_i: number;
  ddc: string[];
  ebook_access: string;
  ebook_count_i: number;
  edition_count: number;
  edition_key: string[];
  first_publish_year: number;
  first_sentence: string[];
  format: string[];
  has_fulltext: boolean;
  ia: string[];
  ia_collection: string[];
  ia_collection_s: string;
  isbn: string[];
  key: string;
  language: string[];
  last_modified_i: number;
  lcc: string[];
  lccn: string[];
  number_of_pages_median: number;
  oclc: string[];
  osp_count: number;
  printdisabled_s: string;
  public_scan_b: boolean;
  publish_date: string[];
  publish_place: string[];
  publish_year: number[];
  publisher: string[];
  seed: string[];
  title: string;
  title_suggest: string;
  title_sort: string;
  type: string;
  id_goodreads: string[];
  id_librarything: string[];
  id_dnb: string[];
  id_amazon: string[];
  id_deposito_legal: string[];
  id_alibris_id: string[];
  id_google: string[];
  id_paperback_swap: string[];
  id_wikidata: string[];
  id_better_world_books: string[];
  id_overdrive: string[];
  id_canadian_national_library_archive: string[];
  subject?: string[];
  place?: string[];
  time?: string[];
  person?: string[];
  ia_loaded_id: string[];
  ia_box_id: string[];
  ratings_average: number;
  ratings_sortable: number;
  ratings_count: number;
  ratings_count_1: number;
  ratings_count_2: number;
  ratings_count_3: number;
  ratings_count_4: number;
  ratings_count_5: number;
  readinglog_count: number;
  want_to_read_count: number;
  currently_reading_count: number;
  already_read_count: number;
  publisher_facet: string[];
  person_key: string[];
  time_facet: string[];
  place_key: string[];
  person_facet: string[];
  subject_facet: string[];
  _version_: number;
  place_facet: string[];
  lcc_sort: string;
  author_facet: string[];
  subject_key: string[];
  ddc_sort: string;
  time_key: string[];
  authors?: BookAuthor[];
  description?: string;
  covers?: number[];
  subject_places?: string[];
  subject_people?: string[];
  subject_times?: string[];
  location?: string;
  latest_revision?: number;
  revision?: number;
  created?: BookCreated;
  last_modified?: BookLastModified;
}

export interface BookSearchResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Book[];
  num_found: number;
  q: string;
  offset: number | null;
}

import FlexSearch from 'flexsearch';

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  url: string;
  repo: string;
}

export class DocSearch {
  private index: any; // FlexSearch Index type
  private documents: Map<string, SearchResult>;

  constructor() {
    this.index = new (FlexSearch.Index as any)({
      tokenize: 'forward',
      cache: true,
    });
    this.documents = new Map();
  }

  /**
   * Add a document to the search index
   */
  addDocument(doc: SearchResult): void {
    this.documents.set(doc.id, doc);
    this.index.add(doc.id, `${doc.title} ${doc.content}`);
  }

  /**
   * Add multiple documents to the search index
   */
  addDocuments(docs: SearchResult[]): void {
    docs.forEach(doc => this.addDocument(doc));
  }

  /**
   * Search the index
   */
  search(query: string): SearchResult[] {
    const results = this.index.search(query, { limit: 10 });
    return results
      .map(id => this.documents.get(String(id)))
      .filter((doc): doc is SearchResult => doc !== undefined);
  }

  /**
   * Clear the index
   */
  clear(): void {
    this.index.clear();
    this.documents.clear();
  }

  /**
   * Export index data
   */
  export(): { index: any; documents: [string, SearchResult][] } {
    return {
      index: this.index.export(),
      documents: Array.from(this.documents.entries()),
    };
  }

  /**
   * Import index data
   */
  import(data: { index: any; documents: [string, SearchResult][] }): void {
    this.index.import(data.index);
    this.documents = new Map(data.documents);
  }
}


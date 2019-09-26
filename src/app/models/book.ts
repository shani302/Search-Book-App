export class Book {
    constructor(
        public id?: string,
        public title?: string,
        public subtitle?: string,
        public authors?: string,
        public description?: string,
        public publishedDate? :string,
        public smallThumbnailUrl?: string
    ) {}
}
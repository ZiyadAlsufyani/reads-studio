import { Book } from "@/lib/api-client";

export const dummyBooks: Book[] = [
  {
    id: "book-1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A story of wealth, love, and the American Dream in the Jazz Age.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 1000000,
  },
  {
    id: "book-2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A novel about racial injustice and moral growth in the American South.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 2000000,
  },
  {
    id: "book-3",
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel about totalitarianism, surveillance, and thought control.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 3000000,
  },
  {
    id: "book-4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "A romantic novel of manners set in early 19th-century England.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 4000000,
  },
  {
    id: "book-5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "A fantasy novel about the adventures of hobbit Bilbo Baggins.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 5000000,
  },
];

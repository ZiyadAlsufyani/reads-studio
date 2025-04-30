export interface Book {
  id: string
  title: string
  author: string
  description: string
  coverImageUrl?: string
  isOwnedByUser: boolean
  createdAt: number
}

// Content type definition
export interface BookContent {
  pages: string[]
  summaries: PageSummary[]
}

export interface PageSummary {
  title: string
  content: string
  imageUrl?: string
  imagePosition?: "top" | "bottom"
  isLoading?: boolean
  isGeneratingImage?: boolean
}

// Get all books
export async function getBooks(): Promise<Book[]> {
  try {
    const savedBooksJson = localStorage.getItem("savedBooks")
    if (savedBooksJson) {
      return JSON.parse(savedBooksJson)
    }
    return []
  } catch (error) {
    console.error("Error fetching books:", error)
    return []
  }
}

// Get a specific book
export async function getBook(id: string): Promise<Book | null> {
  try {
    // First check if it's one of our dummy books
    const dummyBook = dummyBooks.find((book) => book.id === id)
    if (dummyBook) {
      return dummyBook
    }

    // Then check localStorage
    const books = await getBooks()
    return books.find((book) => book.id === id) || null
  } catch (error) {
    console.error("Error fetching book:", error)
    return null
  }
}

// Create a new book
export async function createBook(bookData: Omit<Book, "id" | "createdAt">): Promise<Book> {
  try {
    // Call the API to create the book
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })

    if (!response.ok) {
      throw new Error("Failed to create book")
    }

    const newBook = await response.json()

    // Save to localStorage
    const books = await getBooks()
    const updatedBooks = [...books, newBook]
    localStorage.setItem("savedBooks", JSON.stringify(updatedBooks))

    return newBook
  } catch (error) {
    console.error("Error creating book:", error)
    throw error
  }
}

// Update a book
export async function updateBook(id: string, bookData: Omit<Book, "id" | "createdAt">): Promise<Book> {
  try {
    // Call the API to update the book
    const response = await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })

    if (!response.ok) {
      throw new Error("Failed to update book")
    }

    const updatedBook = await response.json()

    // Update in localStorage
    const books = await getBooks()
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...updatedBook, id, createdAt: book.createdAt } : book,
    )
    localStorage.setItem("savedBooks", JSON.stringify(updatedBooks))

    return updatedBook
  } catch (error) {
    console.error("Error updating book:", error)
    throw error
  }
}

// Delete a book
export async function deleteBook(id: string): Promise<void> {
  try {
    // Call the API to delete the book
    const response = await fetch(`/api/books/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete book")
    }

    // Remove from localStorage
    const books = await getBooks()
    const updatedBooks = books.filter((book) => book.id !== id)
    localStorage.setItem("savedBooks", JSON.stringify(updatedBooks))

    // Also remove any book-specific data
    localStorage.removeItem(`book_pages_${id}`)
    localStorage.removeItem(`book_summaries_${id}`)
  } catch (error) {
    console.error("Error deleting book:", error)
    throw error
  }
}

// Get book content
export async function getBookContent(id: string): Promise<BookContent | null> {
  try {
    // In a real application with a backend database, we would fetch from the API
    // For this demo, we'll read from localStorage
    const pagesKey = `book_pages_${id}`
    const summariesKey = `book_summaries_${id}`

    const savedPages = localStorage.getItem(pagesKey)
    const savedSummaries = localStorage.getItem(summariesKey)

    if (savedPages && savedSummaries) {
      return {
        pages: JSON.parse(savedPages),
        summaries: JSON.parse(savedSummaries),
      }
    }
    return null
  } catch (error) {
    console.error("Error fetching book content:", error)
    return null
  }
}

// Update book content
export async function updateBookContent(id: string, content: BookContent): Promise<void> {
  try {
    // Call the API to update the content
    const response = await fetch(`/api/books/${id}/content`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    })

    if (!response.ok) {
      throw new Error("Failed to update book content")
    }

    // Save to localStorage
    const pagesKey = `book_pages_${id}`
    const summariesKey = `book_summaries_${id}`

    localStorage.setItem(pagesKey, JSON.stringify(content.pages))
    localStorage.setItem(summariesKey, JSON.stringify(content.summaries))
  } catch (error) {
    console.error("Error updating book content:", error)
    throw error
  }
}

// Summarize text
export async function summarizeText(text: string): Promise<{
  title: string
  summary: string
  imageTitle: string
}> {
  try {
    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error("Failed to summarize text")
    }

    const data = await response.json()

    // Ensure we return string values
    return {
      title: typeof data.title === "string" ? data.title : `Summary ${Date.now()}`,
      summary: typeof data.summary === "string" ? data.summary : text.substring(0, 200) + "...",
      imageTitle: typeof data.imageTitle === "string" ? data.imageTitle : "Generated image",
    }
  } catch (error) {
    console.error("Error summarizing text:", error)
    // Return fallback values on error
    return {
      title: `Summary ${Date.now()}`,
      summary: text.substring(0, 200) + "...",
      imageTitle: "Generated image",
    }
  }
}

// Get a new empty book template
export function getNewBookTemplate(): Book {
  return {
    id: `book-${Date.now()}`,
    title: "",
    author: "",
    description: "",
    coverImageUrl: undefined,
    isOwnedByUser: false,
    createdAt: Date.now(),
  }
}

// Add the dummy books array to the file for reference
const dummyBooks: Book[] = [
  {
    id: "book-1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of wealth, love, and the American Dream in the Jazz Age.",
    coverImageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 1000000,
  },
  {
    id: "book-2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A novel about racial injustice and moral growth in the American South.",
    coverImageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 2000000,
  },
  {
    id: "book-3",
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel about totalitarianism, surveillance, and thought control.",
    coverImageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 3000000,
  },
  {
    id: "book-4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel of manners set in early 19th-century England.",
    coverImageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 4000000,
  },
  {
    id: "book-5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A fantasy novel about the adventures of hobbit Bilbo Baggins.",
    coverImageUrl: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 5000000,
  },
  {
    id: "book-6",
    title: "Moby Dick",
    author: "Herman Melville",
    description: "The story of Captain Ahab's quest for revenge against the white whale.",
    coverImageUrl: "https://images.unsplash.com/photo-1603162525937-92a06da7f13d?q=80&w=800&auto=format&fit=crop",
    isOwnedByUser: true,
    createdAt: Date.now() - 6000000,
  },
]

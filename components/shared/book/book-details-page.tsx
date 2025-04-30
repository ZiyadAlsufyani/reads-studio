"use client";

import { useState, useEffect } from "react";
import { BookDetails } from "@/components/shared/book/book-details";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { getBook, updateBook, type Book } from "@/lib/api-client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { client } from "@/lib/amplify";
import { createRead } from "@/src/graphql/mutations";

interface BookDetailsPageProps {
  bookId?: string;
  isNew?: boolean;
}

export function BookDetailsPage({
  bookId,
  isNew = false,
}: BookDetailsPageProps) {
  const router = useRouter();
  const [bookInfo, setBookInfo] = useState<Book>({
    id: bookId || `book-${Date.now()}`,
    title: "",
    author: "",
    description: "",
    coverImageUrl: undefined,
    isOwnedByUser: false,
    createdAt: Date.now(),
  });
  const [isLoading, setIsLoading] = useState(!isNew);
  const { user } = useAuth();

  // Load book info from API on component mount
  useEffect(() => {
    console.log("BookDetailsPage useEffect - isNew:", isNew, "bookId:", bookId);

    if (isNew) {
      // For new books, reset to empty state
      setBookInfo({
        id: `book-${Date.now()}`,
        title: "",
        author: "",
        description: "",
        coverImageUrl: undefined,
        isOwnedByUser: false,
        createdAt: Date.now(),
      });
      setIsLoading(false);
      return;
    }

    if (!isNew && !bookId) {
      router.push("/books");
      return;
    }
    setIsLoading(true);
    const loadBookData = async () => {
      try {
        console.log("Attempting to load book with ID:", bookId);
        const book = await getBook(bookId!);
        console.log("Book data retrieved:", book);

        if (book) {
          setBookInfo(book);
          setIsLoading(false);
        } else {
          console.error("Book not found in data store for ID:", bookId);

          // Instead of redirecting, create a new book with this ID
          const newBookInfo = {
            id: bookId || `book-${Date.now()}`,
            title: "New Book",
            author: "Author",
            description: "Add your description here",
            coverImageUrl: undefined,
            isOwnedByUser: true,
            createdAt: Date.now(),
          };

          setBookInfo(newBookInfo);
          setIsLoading(false);

          // Save this new book to prevent future redirects
          try {
            await updateBook(bookId!, {
              title: newBookInfo.title,
              author: newBookInfo.author,
              description: newBookInfo.description,
              coverImageUrl: newBookInfo.coverImageUrl,
              isOwnedByUser: newBookInfo.isOwnedByUser,
            });
            console.log("Created placeholder book for ID:", bookId);
          } catch (saveError) {
            console.error("Failed to save placeholder book:", saveError);
          }
        }
      } catch (e) {
        console.error("Failed to load book data:", e);
        setIsLoading(false);
      }
    };

    loadBookData();
  }, [bookId, isNew, router]);

  const handleBookInfoUpdate = async (info: Omit<Book, "id" | "createdAt">) => {
    try {
      console.log("Updating book info:", info);

      if (!user?.userId) {
        console.error("User not found. Cannot create a book.");
        toast.error("Authentication Error", {
          description: "You must be logged in to create a book.",
        });
        return;
      }
      console.log("User ID:", info.coverImageUrl);
      if (isNew) {
        console.log("User ID:", user.userId);
        const response = await client.graphql({
          query: createRead,
          variables: {
            input: {
              title: info.title,
              AuthorName: info.author,
              description: info.description,
              thumbnailUrl: info.coverImageUrl ?? "",
              userId: user.userId,
            },
          },
          authMode: "userPool",
        });

        if (response && "data" in response && response.data?.createRead) {
          const newBook = response.data.createRead;
          console.log("Book created successfully:", newBook);

          router.push(`/books/${newBook.id}/content`);
        } else {
          console.error("Failed to create book:", response);
          throw new Error("Failed to create book.");
        }
      } else {
        const updatedBook = await updateBook(bookInfo.id, info);
        setBookInfo(updatedBook);

        toast.success("Book details updated", {
          description: "Your book details have been saved.",
        });
      }
    } catch (e: any) {
      console.error("Failed to save book:", e);
      toast.error("Error saving book", {
        description:
          e?.message || "There was a problem saving your book details.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-muted rounded w-1/3"></div>
          <div className="h-6 bg-muted rounded w-2/3"></div>
          <div className="h-[400px] bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {isNew ? "Create New Book" : "Book Details"}
          </h1>
          <div className="flex gap-3">
            <Link href="/books">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                My Library
              </Button>
            </Link>
            {!isNew && (
              <Link href={`/books/${bookInfo.id}/content`}>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Go to Content Management
                </Button>
              </Link>
            )}
          </div>
        </div>

        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          {isNew
            ? "Enter the details of your new book below."
            : "Edit the details of your book below before creating summaries."}
        </p>

        <BookDetails
          bookInfo={bookInfo}
          onUpdateBookInfo={handleBookInfoUpdate}
          isNew={isNew}
        />
      </div>
    </div>
  );
}

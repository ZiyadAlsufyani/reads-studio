import { createSlide, deleteSlide, deleteRead } from "@/src/graphql/mutations";
import { listReads, listSlides } from "@/src/graphql/queries";
import { client } from "@/lib/amplify";
import { PageSummary } from "../api-client";

export const uploadSlides = async (
  readId: string,
  pageSummaries: PageSummary[]
) => {
  try {
    const uploadPromises = pageSummaries.map((page, index) => {
      const input = {
        readId,
        slideNumber: index + 1, // Slide numbers start from 1
        text: page.content,
        imageUrl: page.imageUrl || "",
      };

      return client.graphql({
        query: createSlide,
        variables: { input },
        authMode: "userPool",
      });
    });

    const results = await Promise.all(uploadPromises);

    return {
      success: true,
      uploadedCount: results.length,
      results,
    };
  } catch (error: any) {
    console.error("Error uploading slides:", error);

    const errorMessage =
      error.errors?.[0]?.message || error.message || "Unknown error occurred";

    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Name need to be changed
export const deleteSlidesByBook = async (readId: string) => {
  try {
    // Fetch all slides associated with this book
    const slidesResponse = await client.graphql({
      query: listSlides,
      variables: {
        filter: { readId: { eq: readId } },
        limit: 1000,
      },
      authMode: "userPool",
    });
    const slides = slidesResponse.data?.listSlides?.items || [];
    if (slides.length === 0) {
      console.log("No slides found to delete.");
      return {
        success: true,
        deletedCount: 0,
        message: "No slides existed for deletion.",
      };
    }

    // Delete each slide individually
    const deletePromises = slides.map((slide) =>
      client.graphql({
        query: deleteSlide,
        variables: { input: { id: slide.id } },
        authMode: "userPool",
      })
    );
    await Promise.all(deletePromises);

    return {
      success: true,
      deletedCount: slides.length,
      message: `${slides.length} slides successfully deleted.`,
    };
  } catch (error: any) {
    console.error("Error deleting slides:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred",
    };
  }
};

export const getUserBooks = async (userId: string) => {
  try {
    const response = await client.graphql({
      query: listReads,
      variables: {
        filter: { userId: { eq: userId } },
        limit: 100, // Adjust as necessary
      },
      authMode: "userPool",
    });

    const books = response.data?.listReads?.items || [];

    // Sort books by createdAt date (newest first)
    books.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    // Step 1: Delete all associated slides
    const slidesResult = await deleteSlidesByBook(bookId);

    if (!slidesResult.success) {
      // Todo: Handle the error appropriately
      console.error("Failed to delete slides:", slidesResult.error);
      // throw new Error(`Failed to delete slides: ${slidesResult.error}`);
    }

    // Step 2: Delete the book itself
    const bookResult = await client.graphql({
      query: deleteRead,
      variables: {
        input: { id: bookId },
      },
      authMode: "userPool",
    });

    const deletedBook = bookResult.data?.deleteRead;

    if (!deletedBook) {
      // Todo: Handle the error appropriately
      console.error("Failed to delete book:", bookResult.errors);
      // throw new Error("Book deletion failed or returned null.");
    }

    return {
      success: true,
      deletedBookId: deletedBook.id,
      deletedSlideCount: slidesResult.deletedCount,
    };
  } catch (error: any) {
    console.error("Error deleting book and its slides:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred during deletion.",
    };
  }
};

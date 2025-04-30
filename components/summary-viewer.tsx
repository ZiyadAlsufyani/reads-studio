"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Save, Upload, ImageIcon, Loader2, X, Smartphone, Edit, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { MobilePreview } from "@/components/mobile-preview"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface PageSummary {
  title: string
  content: string
  imageUrl?: string
  imagePosition?: "top" | "bottom"
  isGeneratingImage?: boolean
}

interface BookInfo {
  title: string
  author: string
  description: string
  coverImageUrl?: string
  isOwnedByUser: boolean
}

interface SummaryViewerProps {
  pageSummary: PageSummary
  pageIndex: number
  bookInfo: BookInfo
  onUpdateSummary: (summary: PageSummary) => void
  onImageGenerationStart?: (pageIndex: number) => void
  onImageGenerationComplete?: (pageIndex: number, imageUrl: string) => void
}

export function SummaryViewer({
  pageSummary,
  pageIndex,
  bookInfo,
  onUpdateSummary,
  onImageGenerationStart,
  onImageGenerationComplete,
}: SummaryViewerProps) {
  const { toast } = useToast()
  const [title, setTitle] = useState(pageSummary.title)
  const [content, setContent] = useState(pageSummary.content)
  const [imageUrl, setImageUrl] = useState<string | undefined>(pageSummary.imageUrl)
  const [imagePosition, setImagePosition] = useState<"top" | "bottom">(pageSummary.imagePosition || "bottom")
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Ensure bookInfo properties are strings
  const safeBookInfo = {
    title: typeof bookInfo.title === "string" ? bookInfo.title : "Untitled Book",
    author: typeof bookInfo.author === "string" ? bookInfo.author : "Unknown Author",
    description: typeof bookInfo.description === "string" ? bookInfo.description : "",
    coverImageUrl: bookInfo.coverImageUrl,
    isOwnedByUser: !!bookInfo.isOwnedByUser,
  }

  // Update local state when the selected page changes
  useEffect(() => {
    if (pageSummary) {
      setTitle(typeof pageSummary.title === "string" ? pageSummary.title : `Summary ${pageIndex + 1}`)
      setContent(typeof pageSummary.content === "string" ? pageSummary.content : "")
      setImageUrl(pageSummary.imageUrl)
      setImagePosition(pageSummary.imagePosition || "bottom")
      setIsGeneratingImage(!!pageSummary.isGeneratingImage)
      setHasChanges(false)
    }
  }, [pageSummary, pageIndex])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    setHasChanges(true)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    setHasChanges(true)
  }

  const handleImagePositionChange = (checked: boolean) => {
    setImagePosition(checked ? "top" : "bottom")
    setHasChanges(true)
  }

  // Update the handleSave function to ensure we're not passing objects directly to toast
  const handleSave = () => {
    // Create a sanitized summary object with validated string values
    const sanitizedSummary: PageSummary = {
      title: typeof title === "string" && title.trim() ? title : "Untitled Summary",
      content: typeof content === "string" ? content : "",
      imageUrl,
      imagePosition,
      isGeneratingImage: !!pageSummary.isGeneratingImage,
    }

    // Pass the sanitized summary to the update function
    onUpdateSummary(sanitizedSummary)
    setHasChanges(false)

    // Use simple string values in toast
    toast.success("Summary updated", {
      description: `Summary for page ${pageIndex + 1} has been saved.`,
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    processImageFile(file)
  }

  const processImageFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const uploadedImageUrl = event.target?.result as string
      setImageUrl(uploadedImageUrl)
      setHasChanges(true)
    }
    reader.readAsDataURL(file)
  }

  // Modify the handleGenerateImage function to be more robust
  const handleGenerateImage = () => {
    // Don't allow generating a new image if one is already being generated
    if (isGeneratingImage) return

    // Store the current page index to ensure the image is applied to the correct page
    const targetPageIndex = pageIndex

    setIsGeneratingImage(true)

    // Notify parent component that image generation has started
    if (onImageGenerationStart) {
      onImageGenerationStart(targetPageIndex)
    }

    // Create an abort controller to handle cancellation
    const abortController = new AbortController()
    const signal = abortController.signal

    // In a real app, this would call an AI image generation API
    // For this demo, we'll simulate it with a timeout and placeholder
    const generateImagePromise = new Promise<string>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        try {
          if (signal.aborted) {
            reject(new Error("Image generation was cancelled"))
            return
          }

          // Generate a random placeholder image
          const width = 600
          const height = 400
          const randomId = Math.floor(Math.random() * 1000)
          const generatedImageUrl = `https://picsum.photos/seed/${randomId}/${width}/${height}`

          resolve(generatedImageUrl)
        } catch (error) {
          reject(error)
        }
      }, 1500)

      // Clean up the timeout if aborted
      signal.addEventListener("abort", () => {
        clearTimeout(timeoutId)
        reject(new Error("Image generation was cancelled"))
      })
    })

    generateImagePromise
      .then((generatedImageUrl) => {
        // Update local state only if we're still on the same page
        if (pageIndex === targetPageIndex) {
          setImageUrl(generatedImageUrl)
          setIsGeneratingImage(false)
          setHasChanges(true)
        }

        // Always notify parent component that image generation is complete
        // This ensures the state is updated correctly even if the user has switched pages
        if (onImageGenerationComplete) {
          onImageGenerationComplete(targetPageIndex, generatedImageUrl)
        }

        toast.success("Image generated", {
          description: `Image for page ${targetPageIndex + 1} has been generated.`,
        })
      })
      .catch((error) => {
        // Only update state if the error wasn't due to cancellation
        if (error.message !== "Image generation was cancelled") {
          setIsGeneratingImage(false)
          toast.error("Failed to generate image", {
            description: "There was a problem generating the image. Please try again.",
          })
          console.error("Image generation error:", error)
        }
      })

    // Return the abort controller so it can be used for cleanup
    return abortController
  }

  // Add a useEffect for cleanup
  useEffect(() => {
    const abortController: AbortController | null = null

    return () => {
      // Clean up any pending image generation when component unmounts
      if (abortController) {
        abortController.abort()
      }
    }
  }, [])

  const handleRemoveImage = () => {
    setImageUrl(undefined)
    setHasChanges(true)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        processImageFile(file)
      } else {
        toast.error("Invalid file type", {
          description: "Please upload an image file.",
        })
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Page {pageIndex + 1} Summary</h2>
        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "edit" | "preview")}>
            <TabsList>
              <TabsTrigger value="edit">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview">
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {viewMode === "edit" && (
            <Button variant="outline" size="sm" onClick={handleSave} disabled={!hasChanges}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          )}
        </div>
      </div>

      {viewMode === "edit" ? (
        <>
          <Card>
            {/* Disable it for now until it is enabled in the */}
            {/* <CardHeader>
              <CardTitle className="text-base">Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter a title for this summary"
                className="mb-4"
              />
            </CardContent> */}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content}
                onChange={handleContentChange}
                placeholder="Enter your summary here..."
                className="min-h-[250px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className={cn(
                    "border rounded-md overflow-hidden transition-colors",
                    isDragging ? "border-primary bg-primary/5" : imageUrl ? "" : "border-dashed",
                  )}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {imageUrl ? (
                    <div className="relative">
                      {/* Mobile-sized image preview container */}
                      <div className="mx-auto max-w-[366px] rounded-md overflow-hidden">
                        <img
                          src={imageUrl || "/placeholder.svg"}
                          alt="Summary illustration"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="p-8 flex flex-col items-center justify-center text-muted-foreground cursor-pointer"
                      onClick={triggerFileInput}
                    >
                      <ImageIcon className="h-10 w-10 mb-2" />
                      <p>{isDragging ? "Drop image here" : "Drag & drop an image or click to upload"}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={triggerFileInput} className="flex-1">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage}
                    className="flex-1"
                  >
                    {isGeneratingImage ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Generate Image
                      </>
                    )}
                  </Button>
                </div>

                {imageUrl && (
                  <div className="flex items-center justify-between mt-4 p-3 border rounded-md bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        {imagePosition === "top" ? (
                          <ArrowUp className="h-5 w-5 text-primary" />
                        ) : (
                          <ArrowDown className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">Image Position</p>
                        <p className="text-sm text-muted-foreground">
                          {imagePosition === "top" ? "Image shown below title" : "Image shown below content"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="image-position" className="sr-only">
                        Image Position
                      </Label>
                      <Switch
                        id="image-position"
                        checked={imagePosition === "top"}
                        onCheckedChange={handleImagePositionChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <MobilePreview
          title={title}
          content={content}
          imageUrl={imageUrl}
          imagePosition={imagePosition}
          bookTitle={safeBookInfo.title}
          author={safeBookInfo.author}
          description={safeBookInfo.description}
        />
      )}
    </div>
  )
}

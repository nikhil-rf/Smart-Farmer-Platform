"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Heart, Share, Send, Users } from "lucide-react"

interface Post {
  id: string
  author: {
    name: string
    role: string
    initials: string
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  tags: string[]
  liked: boolean
}

export function CommunityFeed() {
  const [newPost, setNewPost] = useState("")
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        name: "Rajesh Kumar",
        role: "Organic Farmer",
        initials: "RK",
      },
      content:
        "Just harvested my wheat crop using the new organic fertilizer recommended by the AI assistant. Yield increased by 15% compared to last season! Highly recommend trying organic methods.",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      tags: ["organic", "wheat", "harvest"],
      liked: false,
    },
    {
      id: "2",
      author: {
        name: "Dr. Priya Sharma",
        role: "Agricultural Expert",
        initials: "PS",
      },
      content:
        "Weather forecast shows heavy rains next week. Farmers growing cotton should consider protective measures. Apply fungicide spray as a preventive measure against boll rot.",
      timestamp: "4 hours ago",
      likes: 45,
      comments: 12,
      tags: ["weather", "cotton", "expert-advice"],
      liked: true,
    },
    {
      id: "3",
      author: {
        name: "Manpreet Singh",
        role: "Progressive Farmer",
        initials: "MS",
      },
      content:
        "Looking for buyers for premium basmati rice. 50 quintals available. Direct from farm, no middlemen. Contact me for best prices. Quality guaranteed!",
      timestamp: "6 hours ago",
      likes: 18,
      comments: 15,
      tags: ["selling", "basmati", "direct-sale"],
      liked: false,
    },
  ])

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handlePost = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: "John Doe",
        role: "Farmer",
        initials: "JD",
      },
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      tags: [],
      liked: false,
    }

    setPosts((prev) => [post, ...prev])
    setNewPost("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Community Q&A Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* New Post */}
        <div className="space-y-3">
          <Textarea
            placeholder="Share your farming experience, ask questions, or offer advice to fellow farmers..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex justify-end">
            <Button onClick={handlePost} disabled={!newPost.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Post
            </Button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 border border-border rounded-lg">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-3">
                <Avatar>
                  <AvatarFallback>{post.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-sm">{post.author.name}</h4>
                  <p className="text-xs text-muted-foreground">{post.author.role}</p>
                </div>
                <span className="text-xs text-muted-foreground ml-auto">{post.timestamp}</span>
              </div>

              {/* Content */}
              <p className="text-sm mb-3">{post.content}</p>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={`h-8 px-2 ${post.liked ? "text-red-500" : ""}`}
                >
                  <Heart className={`w-4 h-4 mr-1 ${post.liked ? "fill-current" : ""}`} />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Share className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

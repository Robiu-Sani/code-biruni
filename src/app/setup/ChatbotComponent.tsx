'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, X, Send, Minimize2 } from 'lucide-react'
import Chatbot from 'utils/chatbot'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showChatButton, setShowChatButton] = useState(true)

  // Auto-scroll to bottom when messages change or when loading state changes
 useEffect(() => {
  if (scrollAreaRef.current) {
    scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
  }
}, [messages, isLoading])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Use the Chatbot function directly
      const response = await Chatbot(input.trim())
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact us directly at codebiruny@gmail.com',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  const openChat = () => {
    setIsOpen(true)
    setShowChatButton(false)
  }

  const closeChat = () => {
    setIsOpen(false)
    setShowChatButton(true)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatMessage = (content: string) => {
    let formattedContent = content;

    // Convert markdown links [text](url) to clickable links
    formattedContent = formattedContent.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="inline-link" style="color: #ea580c; text-decoration: underline; font-weight: 500;">$1</a>'
    );

    // Convert * bullet points to proper • points
    formattedContent = formattedContent.replace(/^\*\s+/gm, '• ');

    // Convert markdown-style formatting to HTML
    formattedContent = formattedContent
      .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600;">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>')
      .replace(/\n/g, '<br/>');

    return (
      <div 
        className="message-content"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
        onClick={(e) => {
          // Handle link clicks within the message
          const target = e.target as HTMLElement;
          if (target.classList.contains('inline-link')) {
            e.preventDefault();
            const href = target.getAttribute('href');
            if (href) {
              setTimeout(() => {
                // Use Next.js router or window.location for navigation
                if (href.startsWith('http')) {
                  window.open(href, '_blank');
                } else {
                  window.location.href = href;
                }
              }, 300);
            }
          }
        }}
        style={{ cursor: 'default' }}
      />
    );
  };

  // Welcome message when first opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `Hello! I'm your CodeBiruni AI assistant! 🚀\n\nI can help you with:\n• Our services and expertise\n• Project consultations\n• Pricing information\n• Technical capabilities\n• And much more!\n\nHow can I assist you today?`,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  return (
    <>
      {/* Floating Chat Button */}
      {showChatButton && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in duration-300">
         <Button
  onClick={openChat}
  className="rounded-full w-16 h-16 shadow-2xl bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-white/20"
  size="icon"
>
  <Bot className="h-8 w-8 text-white" />
  <span className="sr-only">Open Chat</span>
</Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[500px] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Card className="w-full h-full py-0 flex flex-col shadow-2xl border-2 border-primary/20 bg-background/95 backdrop-blur-sm overflow-hidden">
            {/* Header - Fixed height ~60px */}
            <CardHeader className="h-[60px] py-3 px-4 bg-gradient-to-r from-primary/10 to-purple-600/10 border-b flex-shrink-0">
  <div className="flex justify-between items-center w-full">
    <div className="flex items-center gap-3">
      <div className="bg-primary/20 p-2 rounded-full">
        <Bot className="h-5 w-5 text-primary" />
      </div>
      <div>
        <CardTitle className="text-lg font-bold leading-tight">
          CodeBiruni Assistant
        </CardTitle>
        <p className="text-xs text-muted-foreground leading-tight">
          Online • Ready to help
        </p>
      </div>
    </div>
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
        onClick={clearChat}
        title="Clear chat"
      >
        <X className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={closeChat}
        title="Minimize chat"
      >
        <Minimize2 className="h-4 w-4" />
      </Button>
    </div>
  </div>
</CardHeader>
        
<CardContent className="flex-1 p-0 flex flex-col min-h-0">
  {/* Messages Area with custom scroll */}
  <div 
    ref={scrollAreaRef}
    className="flex-1 overflow-y-auto p-4 space-y-4"
  >
    {messages.map((message, index) => (
      <div
        key={index}
        className={`flex gap-3 ${
          message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
            message.role === 'user'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground'
          }`}
        >
          {message.role === 'user' ? (
            <User className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
            message.role === 'user'
              ? 'bg-primary text-primary-foreground rounded-br-none'
              : 'bg-muted text-foreground rounded-bl-none border'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            {formatMessage(message.content)}
          </p>
          <p
            className={`text-xs mt-2 ${
              message.role === 'user'
                ? 'text-primary-foreground/70'
                : 'text-muted-foreground'
            }`}
          >
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    ))}
    
    {/* Loading Indicator */}
    {isLoading && (
      <div className="flex gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
          <Bot className="h-4 w-4" />
        </div>
        <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-3 border">
          <div className="flex gap-1 items-center">
            <div className="flex gap-1">
              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              Thinking...
            </span>
          </div>
        </div>
      </div>
    )}
    <div ref={messagesEndRef} />
  </div>

  {/* Input Area - Fixed height ~80px */}
  <div className="h-[80px] flex-shrink-0 p-4 border-t bg-background/50 flex flex-col justify-center">
    <div className="flex gap-2">
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        className="flex-1"
        disabled={isLoading}
      />
      <Button
        onClick={handleSend}
        disabled={!input.trim() || isLoading}
        size="icon"
        className="bg-primary hover:bg-primary/90 transition-colors flex-shrink-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
    <p className="text-xs text-muted-foreground text-center mt-2 leading-tight">
      CodeBiruni AI Assistant • Your digital solution partner
    </p>
  </div>
</CardContent>
           
          </Card>
        </div>
      )}
    </>
  )
}
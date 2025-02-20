"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react"
import {  MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const socialLinks = [
  { href: "https://instagram.com", icon: Instagram, hoverColor: "hover:text-pink-500" },
  { href: "https://facebook.com", icon: Facebook, hoverColor: "hover:text-blue-600" },
  { href: "https://twitter.com", icon: Twitter, hoverColor: "hover:text-blue-400" },
  { href: "https://linkedin.com", icon: Linkedin, hoverColor: "hover:text-blue-700" },
  { href: "https://youtube.com", icon: Youtube, hoverColor: "hover:text-red-600" },
]

interface ContentItem {
  id: string;
  type: "link" | "photo" | "text";
  content: string;
  name: string;
  small_description: string;
  image: string;
  url?: string;
  owner?: string;
  title?: string;
  social_network?: string;
  username?: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
}


interface BioData {
  name: string
  biografy: string
  image: string
  content: ContentItem[]
}

interface MobileScreenProps {
  bioData: BioData
}

const MobileScreen: React.FC<MobileScreenProps> = ({ bioData }) => {
  console.log("MobileScreen rendering with data:", bioData) // Add this line for debugging
  const [imageLoaded, setImageLoaded] = useState(true);

  const isImageUrl = (url: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };
  

  return (
    <div className="lg:max-w-6xl mx-auto lg:flex justify-around min-h-screen p-4">
      <Card className="relative min-w-full lg:min-w-[500px] min-h-[640px] bg-white  rounded-3xl overflow-hidden">
        <header className="bg-gray-800 p-4 text-white text-center">
          <h1 className="font-bold text-xl">Sua Bio</h1>
        </header>

        <ScrollArea className="h-[calc(100%-4rem)] p-4">
          <div className="text-center">
            <Avatar className="w-32 h-32 mx-auto mt-5">
              <AvatarImage src={bioData.image} alt={bioData.name} />
              <AvatarFallback>{bioData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="mt-4 font-medium">{bioData.name}</p>
            <p className="mt-2 text-gray-700 text-sm max-w-[400px] mx-auto">{bioData.biografy}</p>
          </div>
          
          <section className="flex items-center justify-center gap-6 p-6 rounded-lg ">
            {socialLinks.map(({ href, icon: Icon, hoverColor }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label={`Visit our ${Icon.name} page`}
              >
                <Icon
                  className={`w-7 h-7 text-gray-600 ${hoverColor} transition-all duration-300 transform group-hover:scale-110`}
                />
              </a>
            ))}
          </section>

          <div className="mt-10">

          <div className="columns-1 gap-6">
            {bioData.content.map((item) => (
              <div key={item.id} className="overflow-hidden flex flex-col items-center">
                {item.type === "link" && (
                  <div className="w-full max-w-[90%] mt-5 py-2 transition-transform transform hover:scale-105">
                    <Link
                      href={item.url || ""}
                      target="_blank"
                      className="flex flex-col items-center gap-2 w-full h-full justify-center"
                    >
                      <div
                        className={`w-full border rounded p-5 shadow ${
                          item.url?.includes("instagram.com")
                            ? "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white"
                            : item.url?.includes("facebook.com")
                            ? "bg-[#1877F2] text-white"
                            : item.url?.includes("x.com")
                            ? "bg-[#14171A] text-white"
                            : item.url?.includes("youtube.com")
                            ? "bg-[#B31217] text-white"
                            : item.url?.includes("linkedin.com")
                            ? "bg-[#0A66C2] text-white"
                            : "bg-gray-400 text-white"
                        }`}
                      >
                        {isImageUrl(item.url || '') ? (
                          
                            <Image
                              src={item.url || ''}
                              alt={item.content}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-lg opacity-50"
                              onLoadingComplete={() => setImageLoaded(true)}
                              onError={() => setImageLoaded(false)}
                            />
                          
                        ) : null}

                        <div className="flex items-center justify-between">
                          <span className=" max-w-[90%] z-10 text-xl font-semibold">{item.title}</span>
                          {isImageUrl(item.url || '') ? null : (
                            <div className="flex flex-col items-center gap-2">
                              {item.icon && (
                                <Image
                                  src={item.icon || ""}
                                  alt={item.social_network || ""}
                                  className="w-6 h-6 rounded-xl object-cover"
                                  width={32}
                                  height={32}
                                  objectFit="cover"
                                  onLoadingComplete={() => setImageLoaded(false)}
                                  onError={() => setImageLoaded(true)}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                )}

                {item.type === "photo" && item.url && isImageUrl(item.url) && (
                  <div className="w-full rounded-xl max-w-[90%]">
                    <div className="relative mt-5 w-full aspect-square rounded-lg overflow-hidden transition-transform transform hover:scale-90 cursor-pointer">
                      <Image
                        src={item.url}
                        alt={item.content}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-gray-800 font-medium">{item.content}</p>
                      {item.small_description && (
                        <p className="text-gray-600 text-sm">{item.small_description}</p>
                      )}
                      {item.updated_at && (
                        <p className="text-gray-500 text-end text-xs">Publicado: {new Date(item.updated_at).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                )}

                {item.type === "text" && (
                  <p className="text-sm bg-gray-100 p-4 rounded-lg shadow-inner w-full text-center">{item.content}</p>
                )}
              </div>
            ))}
          </div>


          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}

export default MobileScreen


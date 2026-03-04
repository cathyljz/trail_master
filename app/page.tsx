'use client'

import Link from 'next/link'
import { BookOpen, Users, ShoppingBag, ChevronRight, Mountain, Zap, Trophy, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { articles } from '@/data/articles'
import { products } from '@/data/products'

export default function HomePage() {
  const featuredArticles = articles.slice(0, 3)

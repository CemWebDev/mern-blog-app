import { Code, Smartphone, Search, Gauge } from "lucide-react"

export const blogFeatures = [
  {
    name: "Hızlı",
    description: "Lightning Fast",
    color: "bg-gradient-to-br from-orange-500 to-amber-500",
    icon: Gauge,
    position: {
      desktop: { top: "20%", left: "15%" },
      mobile: { top: "10%", left: "20%" },
    },
  },
  {
    name: "Modern",
    description: "Latest Tech",
    color: "bg-gradient-to-br from-indigo-600 to-purple-600",
    icon: Code,
    position: {
      desktop: { top: "35%", right: "20%" },
      mobile: { top: "25%", right: "15%" },
    },
  },
  {
    name: "Responsive",
    description: "Mobile Ready",
    color: "bg-gradient-to-br from-emerald-500 to-teal-500",
    icon: Smartphone,
    position: {
      desktop: { bottom: "30%", left: "10%" },
      mobile: { bottom: "25%", left: "15%" },
    },
  },
  {
    name: "SEO",
    description: "Optimized",
    color: "bg-gradient-to-br from-rose-500 to-pink-500",
    icon: Search,
    position: {
      desktop: { bottom: "20%", right: "15%" },
      mobile: { bottom: "10%", right: "20%" },
    },
  },
]

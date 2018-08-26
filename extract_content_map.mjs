const languages = ["en", "zh"]

const contentMap = [
  {
    url: "georgia-travel-guide",
    content: {
      page_id: 5,
      module_id: 1
    }
  },
  {
    url: "why-should-i-visit",
    content: {
      page_id: 9,
      module_id: 1
    }
  },
  {
    url: "georgia-facts",
    content: {
      page_id: 11,
      module_id: 1
    }
  },
  {
    url: "history-and-culture",
    content: {
      page_id: 12,
      module_id: 1
    }
  },
  {
    url: "travel-info",
    content: {
      page_id: 13,
      module_id: 1
    }
  },
  {
    url: "hotels",
    content: {
      page_id: 14,
      module_id: 1
    }
  },
  {
    url: "about",
    content: {
      page_id: 7,
      module_id: 1
    }
  },
  {
    url: "our-properties",
    content: {
      page_id: 40,
      module_id: 1
    }
  },
  {
    url: "giving-back",
    content: {
      page_id: 33,
      module_id: 1
    }
  },
  {
    url: "testimonials",
    content: {
      page_id: 41,
      module_id: 1
    }
  },
  {
    url: "geography",
    content: {
      page_id: 18,
      module_id: 1
    }
  },
  {
    url: "flora-and-fauna",
    content: {
      page_id: 20,
      module_id: 1
    }
  },
  {
    url: "unesco-world-heritage-sites",
    content: {
      page_id: 21,
      module_id: 1
    }
  },
  {
    url: "history",
    content: {
      page_id: 22,
      module_id: 1
    }
  },
  {
    url: "wine-and-cuisine",
    content: {
      page_id: 23,
      module_id: 1
    }
  },
  {
    url: "music",
    content: {
      page_id: 24,
      module_id: 1
    }
  },
  {
    url: "theatre",
    content: {
      page_id: 25,
      module_id: 1
    }
  },
  {
    url: "folk-dance",
    content: {
      page_id: 26,
      module_id: 1
    }
  },
  {
    url: "art-and-architecture",
    content: {
      page_id: 27,
      module_id: 1
    }
  },
  {
    url: "language-and-script",
    content: {
      page_id: 28,
      module_id: 1
    }
  },
  {
    url: "getting-to-georgia",
    content: {
      page_id: 29,
      module_id: 1
    }
  },
  {
    url: "visa-support",
    content: {
      page_id: 30,
      module_id: 1
    }
  },
  {
    url: "georgian-embassies",
    content: {
      page_id: 31,
      module_id: 1
    }
  },
  {
    url: "foreign-missions-in-georgia",
    content: {
      page_id: 32,
      module_id: 1
    }
  },
  {
    url: "regions",
    template: "regions",
    content: {
      page_id: 10,
      module_id: 1
    }
  },
  {
    url: "regions/adjara",
    template: "regions",
    content: {
      page_id: 25,
      module_id: 36
    }
  },
  {
    url: "regions/dmanisi",
    template: "regions",
    content: {
      page_id: 7,
      module_id: 36
    }
  },
  {
    url: "regions/guria",
    template: "regions",
    content: {
      page_id: 24,
      module_id: 36
    }
  },
  {
    url: "regions/imereti",
    template: "regions",
    content: {
      page_id: 23,
      module_id: 36
    }
  },
  {
    url: "regions/kakheti",
    template: "regions",
    content: {
      page_id: 4,
      module_id: 36
    }
  },
  {
    url: "regions/kartli",
    template: "regions",
    content: {
      page_id: 6,
      module_id: 36
    }
  },
  {
    url: "regions/khevi",
    template: "regions",
    content: {
      page_id: 26,
      module_id: 36
    }
  },
  {
    url: "regions/khevsureti",
    template: "regions",
    content: {
      page_id: 29,
      module_id: 36
    }
  },
  {
    url: "regions/mtskheta-mtianeti",
    template: "regions",
    content: {
      page_id: 3,
      module_id: 36
    }
  },
  {
    url: "regions/racha-lechkhumi",
    template: "regions",
    content: {
      page_id: 22,
      module_id: 36
    }
  },
  {
    url: "regions/samegrelo",
    template: "regions",
    content: {
      page_id: 5,
      module_id: 36
    }
  },
  {
    url: "regions/samtskhe-javakheti",
    template: "regions",
    content: {
      page_id: 8,
      module_id: 36
    }
  },
  {
    url: "regions/svaneti",
    template: "regions",
    content: {
      page_id: 27,
      module_id: 36
    }
  },
  {
    url: "regions/tbilisi",
    template: "regions",
    content: {
      page_id: 2,
      module_id: 36
    }
  },
  {
    url: "regions/tusheti",
    template: "regions",
    content: {
      page_id: 28,
      module_id: 36
    }
  },
  {
    url: "gallery",
    template: "gallery",
    content: {
      page_id: 6,
      module_id: 1
    }
  },
  {
    url: "georgia-tours",
    template: "tourcategory",
    content: {
      page_id: 3,
      module_id: 1
    },
    tourDetails: {
      main_category_id: 1
    }
  },
  {
    url: "georgia-tours/adventure-tours",
    template: "toursubcategory",
    content: {
      page_id: 8,
      module_id: 100
    }
  },
  {
    url: "georgia-tours/business",
    template: "toursubcategory",
    content: {
      page_id: 14,
      module_id: 100
    }
  },
  {
    url: "georgia-tours/cultural-tours",
    template: "toursubcategory",
    content: {
      page_id: 9,
      module_id: 100
    }
  },
  {
    url: "georgia-tours/family",
    template: "toursubcategory",
    content: {
      page_id: 13,
      module_id: 100
    }
  },
  {
    url: "georgia-tours/business",
    template: "toursubcategory",
    content: {
      page_id: 14,
      module_id: 100
    }
  },
  {
    url: "georgia-tours/food-and-wine",
    template: "toursubcategory",
    content: {
      page_id: 10,
      module_id: 100
    }
  },
  {
    url: "georgia-tours/group-tours",
    template: "toursubcategory",
    content: {
      page_id: 32,
      module_id: 100
    }
  },
  {
    url: "georgia-tours/food-and-wine",
    template: "toursubcategory",
    content: {
      page_id: 10,
      module_id: 100
    }
  },
  {
    url: "georgia-tours/leisure-and-health",
    template: "toursubcategory",
    content: {
      page_id: 11,
      module_id: 100
    }
  },
  {
    url: "georgia-tours/romance",
    template: "toursubcategory",
    content: {
      page_id: 12,
      module_id: 100
    }
  },
  {
    url: "multi-country-tours",
    template: "tourcategory",
    content: {
      page_id: 4,
      module_id: 1
    },
    tourDetails: {
      main_category_id: 2
    }
  },
  {
    url: "multi-country-tours/asia",
    template: "toursubcategory",
    content: {
      page_id: 20,
      module_id: 100
    }
  },
  {
    url: "multi-country-tours/europe",
    template: "toursubcategory",
    content: {
      page_id: 22,
      module_id: 100
    }
  },
  {
    url: "multi-country-tours/georgia-and-armenia",
    template: "toursubcategory",
    content: {
      page_id: 17,
      module_id: 100
    }
  },
  {
    url: "multi-country-tours/georgia-armenia-azerbaijan",
    template: "toursubcategory",
    content: {
      page_id: 16,
      module_id: 100
    }
  }
]

const blogMap = [
  {
    url:
      "blog/georgia/13-breath-taking-images-that-will-make-you-visit-georgia",
    template: "blog_post",
    content: {
      page_id: 16,
      module_id: 23
    },
    blog: {
      gategory_id: 1,
      post_id: 1
    }
  },
  {
    url: "blog/georgia/a-day-in-tbilisi",
    template: "blog_post",
    content: {
      page_id: 16,
      module_id: 23
    },
    blog: {
      gategory_id: 1,
      post_id: 2
    }
  },
  {
    url: "blog/georgia/post-3",
    template: "blog_post",
    content: {
      page_id: 16,
      module_id: 23
    },
    blog: {
      gategory_id: 1,
      post_id: 3
    }
  },
  {
    url: "blog/georgia/post-4",
    template: "blog_post",
    content: {
      page_id: 16,
      module_id: 23
    },
    blog: {
      gategory_id: 1,
      post_id: 4
    }
  }
]

const tourMap = [
  {
    url: "georgia-tours/georgia-highlights",
    template: "tour"
  },
  {
    url: "georgia-tours/adventure-tours/hiking-in-svaneti",
    template: "tour"
  },
  {
    url: "georgia-tours/adventure-tours/winter-escape",
    template: "tour"
  },
  {
    url: "georgia-tours/cultural-tours/georgia-panorama",
    template: "tour"
  },
  {
    url: "georgia-tours/food-and-wine/food-and-wine-wine-tour",
    template: "tour"
  },
  {
    url: "georgia-tours/group-tours/joy-of-the-caucasus",
    template: "tour"
  },
  {
    url: "georgia-tours/group-tours/mountains-of-legend",
    template: "tour"
  },
  {
    url: "georgia-tours/group-tours/the-tales-of-svaneti",
    template: "tour"
  },
  {
    url: "multi-country-tours/asia/imperial-japan",
    template: "tour"
  },
  {
    url: "multi-country-tours/asia/siem-reap",
    template: "tour"
  },
  {
    url: "multi-country-tours/europe/explore-historical-rome",
    template: "tour"
  },
  {
    url: "multi-country-tours/europe/germany-austria",
    template: "tour"
  },
  {
    url: "multi-country-tours/europe/uk-adventure",
    template: "tour"
  },
  {
    url: "multi-country-tours/georgia-armenia-azerbaijan/grand-caucasus",
    template: "tour"
  }
]

export { languages, contentMap, blogMap, tourMap }

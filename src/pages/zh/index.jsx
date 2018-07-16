import React from "react"

import PageWrapper from "../../components/page-wrapper"

import reasonsData from "../../../data/reasons.json"

const IndexPage = ({ location }) => (
  <PageWrapper
    location={location}
    bodyTagClasses="home"
    homeOverlay={{
      heading: "旅行的经验会改变生活",
      subheading: "前往格鲁吉亚、亚美尼亚和阿塞拜疆的旅程",
      intro: `帝卡旅行社热烈欢迎您到非凡的文化和历史，地理多样性和惊人的美丽的目的地。 

      我们是您的专业人士,您可以乘坐旅游目的地较少的旅途前往格鲁吉亚，亚美尼亚和阿塞拜疆的高加索地区。`,
      btn_text: "关于我们",
      btn_url: "/zh/about"
    }}
    heading="Welcome to Tika Tours"
    slideshow
    tourList={{
      heading: "Our Featured Tours",
      toursFilter: data =>
        data.filter(t => t.is_featured === "1").sort((a, b) => a.rank - b.rank)
    }}
    reasons={reasonsData}
    mapCanvasCountry="Georgia"
    socialPanel
    homeGallery
    content={{
      page_id: 1,
      module_id: 1
    }}
  />
)

export default IndexPage

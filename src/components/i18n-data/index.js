import _ from "lodash"

import imagesGroups_en from "../../../data/json/en/images/groups.json"
import imagesGroups_zh from "../../../data/json/zh/images/groups.json"

import imagesSlides_en from "../../../data/json/en/images/slides.json"
import imagesSlides_zh from "../../../data/json/zh/images/slides.json"

import strings_en from "../../../data/json/en/strings.json"
import strings_zh from "../../../data/json/zh/strings.json"

const getSlideshowData = (imagesSlides, groupId) => {
  return imagesSlides
    .filter(f => f.imggrp_id == groupId)
    .sort((a, b) => a.imgslide_rank - b.imgslide_rank)
}

const findInTree = (id, tree) => {
  if (tree.path === id) {
    let path = [tree.path]
    return { result: tree, path }
  } else {
    if (tree.pages) {
      for (let child of tree.pages) {
        let tmp = findInTree(id, child)
        if (tmp && !_.isEmpty(tmp)) {
          tmp.path.unshift(tree.path)
          return tmp
        }
      }
    }
    return null
  }
}

const contentData = {
  en: {
    imagesGroups: imagesGroups_en,
    imagesSlides: imagesSlides_en,
    strings: strings_en
  },
  zh: {
    imagesGroups: imagesGroups_zh,
    imagesSlides: imagesSlides_zh,
    strings: strings_zh
  }
}

export { findInTree, getSlideshowData, contentData }

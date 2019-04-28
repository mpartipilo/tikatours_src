import _ from "lodash"

import imagesGroups_en from "../../../data/json/en/images/groups.json"
import imagesGroups_zh from "../../../data/json/zh/images/groups.json"

import imagesSlides_en from "../../../data/json/en/images/slides.json"
import imagesSlides_zh from "../../../data/json/zh/images/slides.json"

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

const allImagesGroups = {
  en: { imagesGroups: imagesGroups_en },
  zh: { imagesGroups: imagesGroups_zh }
}

const allImagesSlides = {
  en: { imagesSlides: imagesSlides_en },
  zh: { imagesSlides: imagesSlides_zh }
}

export { findInTree, getSlideshowData, allImagesGroups, allImagesSlides }

"use client"

import React, { FC } from "react"
import { TaxonomyType } from "@/data/types"
import { ChevronDownIcon } from "@heroicons/react/24/solid"

import Button from "@/components/Button/Button"
import NcModal from "@/components/NcModal/NcModal"
import Tag from "@/components/Tag/Tag"

export interface ModalTagsProps {
  tags: TaxonomyType[]
}

const ModalTags: FC<ModalTagsProps> = ({ tags }) => {
  const renderModalContent = () => {
    return (
      <div className="flex flex-wrap dark:text-neutral-200">
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} className="me-2 mb-2" />
        ))}
      </div>
    )
  }

  return (
    <div className="nc-ModalTags">
      <NcModal
        contentExtraClass="max-w-screen-md"
        renderTrigger={(openModal) => (
          <Button
            pattern="third"
            fontSize="text-sm font-medium"
            onClick={openModal}
          >
            <div>
              <span className="hidden sm:inline">Other</span> Tags
            </div>
            <ChevronDownIcon
              className="w-4 h-4 ms-2 -me-1"
              aria-hidden="true"
            />
          </Button>
        )}
        modalTitle="Discover other tags"
        renderContent={renderModalContent}
      />
    </div>
  )
}

export default ModalTags

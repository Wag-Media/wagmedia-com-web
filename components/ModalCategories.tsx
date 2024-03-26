"use client"

import React, { FC } from "react"
import { getCategories } from "@/data/dbCategories"
import { CategoryWithCount, TaxonomyType } from "@/data/types"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { Category } from "@prisma/client"

import Button from "@/components/Button/Button"
import CardCategory1 from "@/components/CardCategory1/CardCategory1"
import NcModal from "@/components/NcModal/NcModal"

export interface ModalCategoriesProps {
  categories: CategoryWithCount[]
}

const ModalCategories: FC<ModalCategoriesProps> = ({ categories }) => {
  const renderModalContent = () => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-5">
        {categories.map((cat) => (
          <CardCategory1 key={cat.id} category={cat} size="normal" />
        ))}
      </div>
    )
  }

  return (
    <div className="nc-ModalCategories">
      <NcModal
        renderTrigger={(openModal) => (
          <Button
            pattern="third"
            fontSize="text-sm font-medium"
            onClick={openModal}
          >
            <div>
              <span className="hidden sm:inline">Other</span> Categories
            </div>
            <ChevronDownIcon
              className="w-4 h-4 ms-2 -me-1"
              aria-hidden="true"
            />
          </Button>
        )}
        modalTitle="Discover other categories"
        renderContent={renderModalContent}
      />
    </div>
  )
}

export default ModalCategories
